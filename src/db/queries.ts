/**
 * src/db/queries.ts
 * Typed D1 query helpers for all tables.
 */

import { RETIRED_QUESTIONS } from "../content/retired-questions.js";
import { addDaysISO, todayLocalISO } from "../lib/srs.js";
import { unreadDirectionFor, type SupportDirection } from "../lib/support.js";

/**
 * SQL condition: the question aliased `q` is still in the exam (not in
 * RETIRED_QUESTIONS). Add it to every query that serves or counts questions.
 * The ids are inlined, not bound, so callers keep their bound-parameter budget;
 * they come from code and are checked to be digits.
 */
export const NOT_RETIRED = (() => {
  const ids = RETIRED_QUESTIONS.map((question) => question.sourceId);
  if (!ids.every((id) => /^\d+$/.test(id))) throw new Error("RETIRED_QUESTIONS sourceIds must be digits");
  return `COALESCE(q.source_id, '') NOT IN (${ids.map((id) => `'${id}'`).join(",")})`;
})();

export interface DbUser {
  id: number;
  telegram_user_id: number;
  first_name: string | null;
  username: string | null;
  target_exam_date: string | null;
  daily_reminder_hour: number;
  timezone: string;
  is_approved: number;
  access_expires_at: string | null;
  created_at: string;
}

export const TRIAL_DAYS = 14;

export interface AccessGrantRow {
  id: number;
  user_id: number;
  kind: 'trial' | 'paid' | 'gift' | 'set' | 'unlimited' | 'block' | 'legacy';
  days: number | null;
  expires_at: string | null;
  amount_eur: number | null;
  note: string | null;
  created_at: string;
}

export interface AccessGrantInput {
  kind: 'paid' | 'gift' | 'set' | 'unlimited';
  days: number | null;
  amountEur?: number | null;
  note?: string | null;
}

export interface DbTopic {
  id: number;
  name_it: string;
  name_fa: string | null;
  sort_order: number | null;
}

export interface DbQuestion {
  id: number;
  source_id: string | null;
  topic_id: number | null;
  text_it: string;
  correct_answer: number; // 1 = VERO, 0 = FALSO
  image_url: string | null;
  wrong_rate: number;
}

export interface DbExamSession {
  id: number;
  user_id: number;
  mode: string;
  started_at: string;
  finished_at: string | null;
  abandoned_at: string | null;
  duration_seconds: number | null;
  score: number | null;
  wrong_count: number | null;
  passed: number | null;
  ai_enabled: number;
  ai_assisted_at: string | null;
}

export interface DbExamAnswer {
  id: number;
  session_id: number;
  question_id: number;
  position: number;
  user_answer: number | null;
  is_correct: number | null;
  flagged: number;
  answered_at: string | null;
  selected_answer: number | null;
}

export interface DbReviewItem {
  id: number;
  user_id: number;
  question_id: number;
  wrong_count: number;
  last_wrong_at: string;
  next_review_at: string | null;
  cleared: number;
}

export interface DbVocabItem {
  id: number;
  user_id: number;
  term_it: string;
  term_fa: string;
  note: string | null;
  source_question_id: number | null;
  interval_days: number;
  next_review_at: string | null;
  created_at: string;
}

export interface DbTranslation {
  question_id: number;
  lang: string;
  translated_text: string;
  explanation: string | null;
  // §15.2 — three-tab AI panel columns (nullable, populated independently per tab)
  theory_text: string | null;
  grammar_analysis: string | null;
  vocab_suggestions: string | null; // JSON array of vocabulary items + grammatical metadata
  created_at: string;
}


// ── Users ────────────────────────────────────────────────────────────────────

export async function upsertUser(
  db: D1Database,
  telegramUserId: number,
  firstName: string,
  username: string | undefined,
  isAdmin: boolean = false
): Promise<DbUser> {
  // Preserve the live approval on conflict: a concurrent trial/block must not
  // be overwritten by a status read before this profile update.
  await db.prepare(
    `INSERT INTO users (telegram_user_id, first_name, username, is_approved)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(telegram_user_id) DO UPDATE SET
       first_name = excluded.first_name, username = excluded.username,
       is_approved = CASE WHEN ? = 1 THEN 1 ELSE users.is_approved END`
  ).bind(telegramUserId, firstName, username ?? null, isAdmin ? 1 : 0, isAdmin ? 1 : 0).run();

  return db
    .prepare(`SELECT * FROM users WHERE telegram_user_id = ?`)
    .bind(telegramUserId)
    .first<DbUser>() as Promise<DbUser>;
}

export async function setUserApproval(
  db: D1Database,
  telegramUserId: number,
  isApproved: number
): Promise<DbUser | null> {
  if (isApproved === 1) {
    const user = await getUserByTelegramId(db, telegramUserId);
    if (!user) return null;
    const trial = await startTrialIfEligible(db, user.id);
    if (trial.started) return trial.user;
    // A pre-trial block has NULL as "no window", not unlimited. Preserve
    // unlimited only when it was recorded explicitly or backfilled as legacy.
    await db.prepare(
      `UPDATE users SET is_approved = 1,
         access_expires_at = CASE WHEN access_expires_at IS NULL AND NOT EXISTS (
           SELECT 1 FROM access_grants WHERE user_id = users.id
             AND kind IN ('unlimited', 'legacy') AND expires_at IS NULL
         ) THEN datetime('now') ELSE access_expires_at END
       WHERE telegram_user_id = ?`
    ).bind(telegramUserId).run();
    return getUserByTelegramId(db, telegramUserId);
  }

  const update = db.prepare(`UPDATE users SET is_approved = ? WHERE telegram_user_id = ?`)
    .bind(isApproved, telegramUserId);
  if (isApproved === -1) {
    await db.batch([
      update,
      db.prepare(
        `INSERT INTO access_grants (user_id, kind, expires_at)
         SELECT id, 'block', access_expires_at FROM users WHERE telegram_user_id = ?`
      ).bind(telegramUserId),
    ]);
  } else {
    await update.run();
  }
  return getUserByTelegramId(db, telegramUserId);
}

export async function startTrialIfEligible(
  db: D1Database,
  userId: number
): Promise<{ started: boolean; user: DbUser | null }> {
  const results = await db.batch([
    db.prepare(
      `INSERT INTO access_grants (user_id, kind, days, expires_at)
       SELECT ?, 'trial', ?, datetime('now', ?)
       WHERE NOT EXISTS (SELECT 1 FROM access_grants WHERE user_id = ?)
         AND (SELECT is_approved FROM users WHERE id = ?) = 0`
    ).bind(userId, TRIAL_DAYS, `+${TRIAL_DAYS} days`, userId, userId),
    db.prepare(
      `UPDATE users SET is_approved = 1,
         access_expires_at = (SELECT expires_at FROM access_grants WHERE user_id = ? AND kind = 'trial')
       WHERE id = ? AND is_approved = 0 AND changes() > 0
         AND EXISTS (SELECT 1 FROM access_grants WHERE user_id = ? AND kind = 'trial')`
    ).bind(userId, userId, userId),
  ]);
  // changes() also prevents re-approving a pending account with an old trial.
  return { started: results[0].meta.changes > 0, user: await getUserById(db, userId) };
}

export async function grantAccess(
  db: D1Database,
  userId: number,
  grant: AccessGrantInput
): Promise<DbUser | null> {
  // Compute from the live row inside the batch, so concurrent purchases stack
  // without losing days. SQLite datetime() emits UTC YYYY-MM-DD HH:MM:SS.
  await db.batch([
    db.prepare(
      `UPDATE users SET is_approved = 1,
         access_expires_at = CASE WHEN ? = 'unlimited' THEN NULL ELSE
           COALESCE(datetime(CASE WHEN ? IN ('paid', 'gift') AND is_approved = 1
                              AND datetime(access_expires_at) > datetime('now')
                         THEN access_expires_at ELSE datetime('now') END, ?), datetime('now', ?)) END
       WHERE id = ?`
    ).bind(grant.kind, grant.kind, `+${grant.days ?? 0} days`, `+${grant.days ?? 0} days`, userId),
    db.prepare(
      `INSERT INTO access_grants (user_id, kind, days, expires_at, amount_eur, note)
       SELECT id, ?, ?, access_expires_at, ?, ? FROM users WHERE id = ?`
    ).bind(grant.kind, grant.days, grant.amountEur ?? null, grant.note ?? null, userId),
  ]);
  return getUserById(db, userId);
}

export async function getAccessGrants(db: D1Database, userId: number): Promise<AccessGrantRow[]> {
  const result = await db.prepare(
    `SELECT * FROM access_grants WHERE user_id = ? ORDER BY created_at DESC, id DESC`
  ).bind(userId).all<AccessGrantRow>();
  return result.results;
}

export async function getUserByTelegramId(
  db: D1Database,
  telegramUserId: number
): Promise<DbUser | null> {
  return db
    .prepare(`SELECT * FROM users WHERE telegram_user_id = ?`)
    .bind(telegramUserId)
    .first<DbUser>();
}

/**
 * Look up by the internal row id. The admin dashboard identifies users by
 * users.id, while everything that talks to Telegram needs telegram_user_id —
 * this is the translation between the two.
 */
export async function getUserById(
  db: D1Database,
  userId: number
): Promise<DbUser | null> {
  return db.prepare(`SELECT * FROM users WHERE id = ?`).bind(userId).first<DbUser>();
}

export async function getAllUsers(db: D1Database): Promise<DbUser[]> {
  const result = await db.prepare(`SELECT * FROM users`).all<DbUser>();
  return result.results;
}

export async function updateUserTargetDate(
  db: D1Database,
  userId: number,
  targetExamDate: string | null
): Promise<void> {
  await db
    .prepare(`UPDATE users SET target_exam_date = ? WHERE id = ?`)
    .bind(targetExamDate, userId)
    .run();
}

// ── Topics ───────────────────────────────────────────────────────────────────

export interface TopicWithStats extends DbTopic {
  question_count: number;
  accuracy: number | null;
  /** This user's answer attempts in the chapter (a re-answered question counts twice). */
  total_answered: number;
  /** Distinct questions in the chapter this user has answered at least once. */
  answered_count: number;
  /** question_count - answered_count — questions they have never seen. */
  remaining_count: number;
}

export async function getAllTopics(db: D1Database): Promise<DbTopic[]> {
  const result = await db
    .prepare(`SELECT * FROM topics ORDER BY sort_order`)
    .all<DbTopic>();
  return result.results;
}

/**
 * Chapter list with this user's own progress.
 *
 * The user filter has to sit on the exam_answers join, not on a further LEFT
 * JOIN to exam_sessions. A condition on the *right* side of a LEFT JOIN cannot
 * remove rows — it only nulls the joined columns — so the previous shape counted
 * every user's answers and then divided by every user's answers. With 18 users
 * in the bank, chapter 1 was aggregating 697 attempts to show a single number
 * that no one's own performance had produced (283 of those attempts were the
 * user actually looking at the screen).
 *
 * user_answer IS NOT NULL matters too: starting a session pre-inserts one blank
 * exam_answers row per drawn question (see insertExamAnswer), so an unfiltered
 * count treats questions merely *dealt* as questions answered.
 */
export async function getAllTopicsWithStats(
  db: D1Database,
  userId: number
): Promise<TopicWithStats[]> {
  const result = await db
    .prepare(
      `SELECT
         t.id, t.name_it, t.name_fa, t.sort_order,
         COUNT(DISTINCT q.id) AS question_count,
         COUNT(ea.id) AS total_answered,
         COUNT(DISTINCT ea.question_id) AS answered_count,
         COUNT(DISTINCT q.id) - COUNT(DISTINCT ea.question_id) AS remaining_count,
         CASE
           WHEN COUNT(ea.id) > 0
           THEN ROUND(100.0 * SUM(COALESCE(ea.is_correct, 0)) / COUNT(ea.id), 1)
           ELSE NULL
         END AS accuracy
       FROM topics t
       LEFT JOIN questions q ON q.topic_id = t.id AND ${NOT_RETIRED}
       LEFT JOIN exam_answers ea
              ON ea.question_id = q.id
             AND ea.user_answer IS NOT NULL
             AND ea.session_id IN (SELECT id FROM exam_sessions WHERE user_id = ?)
       GROUP BY t.id, t.name_it, t.name_fa, t.sort_order
       ORDER BY t.sort_order ASC`
    )
    .bind(userId)
    .all<TopicWithStats>();

  return result.results;
}

// ── Questions ────────────────────────────────────────────────────────────────

export interface QuestionWithTopic extends DbQuestion {
  topic_name_it: string | null;
  topic_name_fa: string | null;
}

/** At most this many of the 30 slots go to due review questions. */
const REVIEW_SLOTS = 8;
/** A question the user has already seen is not drawn again for this many days. */
const COOLDOWN_DAYS = 14;

/**
 * Draw 30 questions for a new exam session.
 *
 * Two rules keep the exam from feeling repetitive:
 *  - review questions only come back once they're *due* (the morning after they
 *    were missed) — not in every session from the moment you get them wrong;
 *  - the random fill skips anything answered in the last COOLDOWN_DAYS days.
 */
export async function drawExamQuestions(
  db: D1Database,
  userId: number,
  count = 30
): Promise<DbQuestion[]> {
  // Due review questions — oldest due date first, then most-missed.
  const rq = await db
    .prepare(
      `SELECT q.* FROM questions q
       JOIN review_queue rv ON rv.question_id = q.id
       WHERE rv.user_id = ? AND rv.cleared = 0 AND ${NOT_RETIRED}
         AND (rv.next_review_at IS NULL OR rv.next_review_at <= ?)
       ORDER BY rv.next_review_at ASC, rv.wrong_count DESC
       LIMIT ?`
    )
    .bind(userId, todayLocalISO(), REVIEW_SLOTS)
    .all<DbQuestion>();
  const reviewQuestions = rq.results;

  const usedIds = new Set(reviewQuestions.map((q) => q.id));
  const fillRandom = async (respectCooldown: boolean): Promise<DbQuestion[]> => {
    const remaining = count - usedIds.size;
    if (remaining <= 0) return [];
    const exclude =
      usedIds.size > 0 ? `AND id NOT IN (${[...usedIds].map(() => "?").join(",")})` : "";
    const cooldown = respectCooldown
      ? `AND id NOT IN (
           SELECT ea.question_id FROM exam_answers ea
           JOIN exam_sessions es ON es.id = ea.session_id
           WHERE es.user_id = ? AND ea.answered_at >= ?
         )`
      : "";
    const binds: unknown[] = [...usedIds];
    if (respectCooldown) binds.push(userId, `${addDaysISO(todayLocalISO(), -COOLDOWN_DAYS)} 00:00:00`);
    const res = await db
      .prepare(
        `SELECT * FROM questions q
         WHERE ${NOT_RETIRED} ${exclude} ${cooldown}
         ORDER BY RANDOM()
         LIMIT ?`
      )
      .bind(...binds, remaining)
      .all<DbQuestion>();
    for (const q of res.results) usedIds.add(q.id);
    return res.results;
  };

  const fresh = await fillRandom(true);
  // Bank exhausted for this user (small bank / very heavy usage) — top up
  // without the cooldown rather than serving a short exam.
  const topUp = usedIds.size < count ? await fillRandom(false) : [];

  const allQuestions = [...reviewQuestions, ...fresh, ...topUp];

  // Shuffle so review questions aren't always at the front
  for (let i = allQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
  }

  return allQuestions.slice(0, count);
}

/**
 * Finished 30-question simulations without AI help, newest first: the only
 * sessions the readiness light trusts (src/lib/readiness.ts).
 */
export async function getUnassistedSimulations(
  db: D1Database,
  userId: number,
  limit: number
): Promise<{ id: number; wrong_count: number; finished_at: string }[]> {
  const result = await db
    .prepare(
      `SELECT es.id, es.wrong_count, es.finished_at
       FROM exam_sessions es
       WHERE es.user_id = ? AND es.mode = 'exam'
         AND es.finished_at IS NOT NULL AND es.abandoned_at IS NULL AND es.ai_assisted_at IS NULL
         AND (SELECT COUNT(*) FROM exam_answers ea WHERE ea.session_id = es.id) = 30
       ORDER BY es.finished_at DESC, es.id DESC
       LIMIT ?`
    )
    .bind(userId, limit)
    .all<{ id: number; wrong_count: number; finished_at: string }>();
  return result.results;
}

/** source_id of every answer in these sessions that was not correct (unanswered counts, as at finish). */
export async function getWrongSourceIds(db: D1Database, sessionIds: number[]): Promise<string[]> {
  if (sessionIds.length === 0) return [];
  const result = await db
    .prepare(
      `SELECT q.source_id AS source_id
       FROM exam_answers ea JOIN questions q ON q.id = ea.question_id
       WHERE ea.session_id IN (${sessionIds.map(() => "?").join(",")}) AND COALESCE(ea.is_correct, 0) <> 1`
    )
    .bind(...sessionIds)
    .all<{ source_id: string | null }>();
  return result.results.flatMap((row) => (row.source_id ? [row.source_id] : []));
}

export async function getQuestionById(
  db: D1Database,
  questionId: number
): Promise<DbQuestion | null> {
  return db
    .prepare(`SELECT * FROM questions WHERE id = ?`)
    .bind(questionId)
    .first<DbQuestion>();
}

export async function getQuestionCount(db: D1Database): Promise<number> {
  const row = await db
    .prepare(`SELECT COUNT(*) as cnt FROM questions q WHERE ${NOT_RETIRED}`)
    .first<{ cnt: number }>();
  return row?.cnt ?? 0;
}

// ── Exam sessions ────────────────────────────────────────────────────────────

/**
 * Atomically retire every open session and create its replacement.
 * D1 batch statements commit as one transaction, so concurrent starts never
 * expose two active sessions between the update and insert.
 */
export async function replaceActiveExamSession(
  db: D1Database,
  userId: number,
  mode: "exam" | "review" | "topic_practice",
  questionIds: number[]
): Promise<number> {
  if (questionIds.length === 0) throw new Error("Cannot create an exam without questions");

  const answerStatements = questionIds.map((questionId, index) =>
    db
      .prepare(
        `INSERT INTO exam_answers
           (session_id, question_id, position, user_answer, is_correct, answered_at)
         SELECT es.id, ?, ?, NULL, NULL, NULL
         FROM exam_sessions es
         WHERE es.user_id = ? AND es.finished_at IS NULL AND es.abandoned_at IS NULL
         ORDER BY es.id DESC
         LIMIT 1`
      )
      .bind(questionId, index + 1, userId)
  );

  const results = await db.batch<{ id: number }>([
    db
      .prepare(
        `UPDATE exam_sessions
         SET abandoned_at = COALESCE(abandoned_at, datetime('now'))
         WHERE user_id = ? AND finished_at IS NULL AND abandoned_at IS NULL`
      )
      .bind(userId),
    db
      .prepare(`INSERT INTO exam_sessions (user_id, mode) VALUES (?, ?) RETURNING id`)
      .bind(userId, mode),
    ...answerStatements,
  ]);
  const created = results[1]?.results[0];
  if (!created) throw new Error("Failed to replace active exam session");
  return created.id;
}

export async function insertExamAnswer(
  db: D1Database,
  sessionId: number,
  questionId: number,
  position: number,
  userAnswer: number | null,
  isCorrect: number | null
): Promise<void> {
  await db
    .prepare(
      `INSERT OR IGNORE INTO exam_answers
         (session_id, question_id, position, user_answer, is_correct, answered_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'))`
    )
    .bind(sessionId, questionId, position, userAnswer, isCorrect)
    .run();
}

/** Record the first answer only while its owning session is still active. */
export type ExamAnswerRecordResult = "recorded" | "duplicate" | "conflict" | "inactive";

export async function recordExamAnswer(
  db: D1Database,
  sessionId: number,
  userId: number,
  questionId: number,
  userAnswer: 0 | 1,
  isCorrect: 0 | 1
): Promise<ExamAnswerRecordResult> {
  const result = await db
    .prepare(
      `UPDATE exam_answers
       SET user_answer = ?, is_correct = ?, answered_at = datetime('now')
       WHERE session_id = ?
         AND question_id = ?
         AND user_answer IS NULL
         AND EXISTS (
           SELECT 1
           FROM exam_sessions es
           WHERE es.id = exam_answers.session_id
             AND es.user_id = ?
             AND es.finished_at IS NULL
             AND es.abandoned_at IS NULL
             AND es.started_at >= datetime('now', '-30 minutes')
         )`
    )
    .bind(userAnswer, isCorrect, sessionId, questionId, userId)
    .run();
  if (result.meta.changes === 1) return "recorded";

  // A response can be lost after D1 commits. Treat an exact retry as success so
  // the client can reconcile safely without ever allowing an answer change.
  const existing = await db
    .prepare(
      `SELECT ea.user_answer
       FROM exam_answers ea
       JOIN exam_sessions es ON es.id = ea.session_id
       WHERE ea.session_id = ? AND ea.question_id = ? AND es.user_id = ?`
    )
    .bind(sessionId, questionId, userId)
    .first<{ user_answer: number | null }>();
  if (existing?.user_answer === userAnswer) return "duplicate";
  if (existing?.user_answer != null) return "conflict";
  return "inactive";
}

export async function updateAnswerFlag(
  db: D1Database,
  sessionId: number,
  questionId: number,
  flagged: number
): Promise<void> {
  await db
    .prepare(
      `UPDATE exam_answers SET flagged = ? WHERE session_id = ? AND question_id = ?`
    )
    .bind(flagged, sessionId, questionId)
    .run();
}

export async function finishExamSession(
  db: D1Database,
  sessionId: number,
  userId: number,
  durationSeconds: number
): Promise<boolean> {
  const result = await finishSessionStatement(db, sessionId, userId, durationSeconds).run();
  return result.meta.changes === 1;
}

/** Score from the stored is_correct values and close the session, only while it is active. */
function finishSessionStatement(
  db: D1Database,
  sessionId: number,
  userId: number,
  durationSeconds: number
): D1PreparedStatement {
  return db
    .prepare(
      `WITH result AS (
         SELECT
           COUNT(*) AS total_count,
           COALESCE(SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END), 0) AS correct_count,
           COALESCE(SUM(CASE WHEN is_correct = 1 THEN 0 ELSE 1 END), 0) AS wrong_count
         FROM exam_answers
         WHERE session_id = ?
       )
       UPDATE exam_sessions
       SET finished_at = datetime('now'),
           score = (SELECT correct_count FROM result),
           wrong_count = (SELECT wrong_count FROM result),
           passed = (
             SELECT CASE
               WHEN wrong_count <= CASE WHEN total_count BETWEEN 1 AND 10 THEN 1 ELSE 3 END
               THEN 1 ELSE 0
             END
             FROM result
           ),
           duration_seconds = ?
       WHERE id = ?
         AND user_id = ?
         AND finished_at IS NULL
         AND abandoned_at IS NULL
         AND started_at >= datetime('now', '-30 minutes')`
    )
    .bind(sessionId, durationSeconds, sessionId, userId);
}

// ── Exam mode: provisional selections, graded only at finish ────────────────
// A selection lives in selected_answer while the exam is open. user_answer and
// is_correct stay NULL until finish, so stats queries, the tutor gate and
// explain-wrong (which all read those columns) cannot reveal correctness early.

/** The owning exam-mode session is still open. `exam_answers` must be in scope. */
const ACTIVE_EXAM_GUARD = `EXISTS (
           SELECT 1
           FROM exam_sessions es
           WHERE es.id = exam_answers.session_id
             AND es.user_id = ?
             AND es.mode = 'exam'
             AND es.finished_at IS NULL
             AND es.abandoned_at IS NULL
             AND es.started_at >= datetime('now', '-30 minutes')
         )`;

export type ExamSelectionResult = "saved" | "inactive" | "not_in_session";

/** Overwrite the provisional selection; later saves replace earlier ones. */
export async function saveExamSelection(
  db: D1Database,
  sessionId: number,
  userId: number,
  questionId: number,
  answer: 0 | 1
): Promise<ExamSelectionResult> {
  const result = await db
    .prepare(
      `UPDATE exam_answers
       SET selected_answer = ?, answered_at = datetime('now')
       WHERE session_id = ? AND question_id = ? AND ${ACTIVE_EXAM_GUARD}`
    )
    .bind(answer, sessionId, questionId, userId)
    .run();
  if (result.meta.changes === 1) return "saved";

  const row = await db
    .prepare(`SELECT 1 AS found FROM exam_answers WHERE session_id = ? AND question_id = ?`)
    .bind(sessionId, questionId)
    .first<{ found: number }>();
  return row ? "inactive" : "not_in_session";
}

/**
 * Apply the selections sent with "Finish exam", promote every selection to a
 * graded answer, then score and close the session — one transaction, so the
 * selections and the score commit together or not at all.
 */
export async function finishDeferredExamSession(
  db: D1Database,
  sessionId: number,
  userId: number,
  durationSeconds: number,
  answers: ReadonlyMap<number, 0 | 1>
): Promise<boolean> {
  const applySelections = [...answers].map(([questionId, answer]) =>
    db
      .prepare(
        `UPDATE exam_answers SET selected_answer = ?
         WHERE session_id = ? AND question_id = ? AND ${ACTIVE_EXAM_GUARD}`
      )
      .bind(answer, sessionId, questionId, userId)
  );
  const promote = db
    .prepare(
      `UPDATE exam_answers
       SET user_answer = selected_answer,
           is_correct = CASE
             WHEN selected_answer IS NULL THEN NULL
             WHEN selected_answer = (SELECT q.correct_answer FROM questions q WHERE q.id = exam_answers.question_id) THEN 1
             ELSE 0
           END
       WHERE session_id = ? AND ${ACTIVE_EXAM_GUARD}`
    )
    .bind(sessionId, userId);

  const results = await db.batch([
    ...applySelections,
    promote,
    finishSessionStatement(db, sessionId, userId, durationSeconds),
  ]);
  return results[results.length - 1]?.meta.changes === 1;
}

/** Switch AI help; ai_assisted_at records the first switch-on and is never cleared. */
export async function setExamAssistance(
  db: D1Database,
  sessionId: number,
  userId: number,
  enabled: boolean
): Promise<{ enabled: boolean; assisted: boolean } | null> {
  const flag = enabled ? 1 : 0;
  const result = await db
    .prepare(
      `UPDATE exam_sessions
       SET ai_enabled = ?,
           ai_assisted_at = COALESCE(ai_assisted_at, CASE WHEN ? = 1 THEN datetime('now') END)
       WHERE id = ?
         AND user_id = ?
         AND mode = 'exam'
         AND finished_at IS NULL
         AND abandoned_at IS NULL
         AND started_at >= datetime('now', '-30 minutes')`
    )
    .bind(flag, flag, sessionId, userId)
    .run();
  if (result.meta.changes !== 1) return null;

  const row = await db
    .prepare(`SELECT ai_enabled, ai_assisted_at FROM exam_sessions WHERE id = ?`)
    .bind(sessionId)
    .first<{ ai_enabled: number; ai_assisted_at: string | null }>();
  return { enabled: row?.ai_enabled === 1, assisted: row?.ai_assisted_at != null };
}

/** AI help is off for this question because it belongs to the user's open, unassisted exam. */
export async function isAiLockedForQuestion(
  db: D1Database,
  userId: number,
  questionId: number
): Promise<boolean> {
  const row = await db
    .prepare(
      `SELECT 1 AS locked
       FROM exam_sessions es
       JOIN exam_answers ea ON ea.session_id = es.id
       WHERE es.user_id = ?
         AND es.mode = 'exam'
         AND es.ai_enabled = 0
         AND es.finished_at IS NULL
         AND es.abandoned_at IS NULL
         AND es.started_at >= datetime('now', '-30 minutes')
         AND ea.question_id = ?
       LIMIT 1`
    )
    .bind(userId, questionId)
    .first<{ locked: number }>();
  return row !== null;
}

export interface ActiveExamQuestion {
  position: number;
  question_id: number;
  text_it: string;
  image_url: string | null;
  topic_id: number | null;
  selected_answer: number | null;
  flagged: number;
}

/** The user's newest open exam-mode session, for resuming after a reload. */
export async function getActiveDeferredExam(
  db: D1Database,
  userId: number
): Promise<{ session: DbExamSession; questions: ActiveExamQuestion[] } | null> {
  const session = await db
    .prepare(
      `SELECT * FROM exam_sessions
       WHERE user_id = ?
         AND mode = 'exam'
         AND finished_at IS NULL
         AND abandoned_at IS NULL
         AND started_at >= datetime('now', '-30 minutes')
       ORDER BY id DESC
       LIMIT 1`
    )
    .bind(userId)
    .first<DbExamSession>();
  if (!session) return null;

  const questions = await db
    .prepare(
      `SELECT ea.position, ea.question_id, q.text_it, q.image_url, q.topic_id,
              ea.selected_answer, ea.flagged
       FROM exam_answers ea
       JOIN questions q ON q.id = ea.question_id
       WHERE ea.session_id = ?
       ORDER BY ea.position`
    )
    .bind(session.id)
    .all<ActiveExamQuestion>();
  return { session, questions: questions.results };
}

export async function getSessionAnswers(
  db: D1Database,
  sessionId: number
): Promise<DbExamAnswer[]> {
  const result = await db
    .prepare(`SELECT * FROM exam_answers WHERE session_id = ? ORDER BY position`)
    .bind(sessionId)
    .all<DbExamAnswer>();
  return result.results;
}

export async function getSessionById(
  db: D1Database,
  sessionId: number
): Promise<DbExamSession | null> {
  return db
    .prepare(`SELECT * FROM exam_sessions WHERE id = ?`)
    .bind(sessionId)
    .first<DbExamSession>();
}

export async function abandonExamSession(
  db: D1Database,
  sessionId: number,
  userId: number
): Promise<boolean> {
  const result = await db
    .prepare(
      `UPDATE exam_sessions
       SET abandoned_at = datetime('now')
       WHERE id = ?
         AND user_id = ?
         AND finished_at IS NULL
         AND abandoned_at IS NULL`
    )
    .bind(sessionId, userId)
    .run();
  return result.meta.changes === 1;
}

/** Close stale unfinished sessions before dealing a new one to this user. */
export async function abandonOpenExamSessions(
  db: D1Database,
  userId: number
): Promise<void> {
  await db
    .prepare(
      `UPDATE exam_sessions
       SET abandoned_at = COALESCE(abandoned_at, datetime('now'))
       WHERE user_id = ? AND finished_at IS NULL AND abandoned_at IS NULL`
    )
    .bind(userId)
    .run();
}

// ── Review queue ─────────────────────────────────────────────────────────────

export async function upsertReviewQueue(
  db: D1Database,
  userId: number,
  questionId: number,
  nextReviewAt: string
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO review_queue (user_id, question_id, wrong_count, last_wrong_at, next_review_at, cleared)
       VALUES (?, ?, 1, datetime('now'), ?, 0)
       ON CONFLICT(user_id, question_id)
       DO UPDATE SET
         wrong_count = wrong_count + 1,
         last_wrong_at = datetime('now'),
         next_review_at = excluded.next_review_at,
         cleared = 0`
    )
    .bind(userId, questionId, nextReviewAt)
    .run();
}

export async function getDueReviewQuestions(
  db: D1Database,
  userId: number
): Promise<DbQuestion[]> {
  const today = todayLocalISO();
  const result = await db
    .prepare(
      `SELECT q.* FROM questions q
       JOIN review_queue rq ON rq.question_id = q.id
       WHERE rq.user_id = ? AND rq.cleared = 0 AND (rq.next_review_at IS NULL OR rq.next_review_at <= ?)
         AND ${NOT_RETIRED}
       ORDER BY rq.wrong_count DESC, rq.last_wrong_at DESC`
    )
    .bind(userId, today)
    .all<DbQuestion>();
  return result.results;
}

export async function getPendingReviewCount(
  db: D1Database,
  userId: number
): Promise<number> {
  const today = todayLocalISO();
  const row = await db
    .prepare(
      `SELECT COUNT(*) as cnt FROM review_queue rq
       JOIN questions q ON q.id = rq.question_id
       WHERE rq.user_id = ? AND rq.cleared = 0 AND (rq.next_review_at IS NULL OR rq.next_review_at <= ?)
         AND ${NOT_RETIRED}`
    )
    .bind(userId, today)
    .first<{ cnt: number }>();
  return row?.cnt ?? 0;
}

/**
 * Retire questions from the review queue once the user gets them right.
 * Without this the queue only ever grows and every exam keeps serving the
 * same old mistakes back.
 * ponytail: one correct answer retires the item; require two in a row if
 * users start passing by luck.
 */
export async function clearReviewItems(
  db: D1Database,
  userId: number,
  questionIds: number[]
): Promise<void> {
  if (questionIds.length === 0) return;
  const placeholders = questionIds.map(() => "?").join(",");
  await db
    .prepare(
      `UPDATE review_queue SET cleared = 1
       WHERE user_id = ? AND question_id IN (${placeholders})`
    )
    .bind(userId, ...questionIds)
    .run();
}

// ── Translations cache ────────────────────────────────────────────────────────

export async function getCachedTranslation(
  db: D1Database,
  questionId: number,
  lang: string
): Promise<DbTranslation | null> {
  return db
    .prepare(`SELECT * FROM translations_cache WHERE question_id = ? AND lang = ?`)
    .bind(questionId, lang)
    .first<DbTranslation>();
}

export async function insertTranslation(
  db: D1Database,
  questionId: number,
  lang: string,
  translatedText: string,
  explanation: string
): Promise<void> {
  await db
    .prepare(
      // Upsert, not INSERT OR REPLACE: replacing the row would silently drop
      // the cached theory_text / grammar_analysis / vocab_suggestions columns
      // and make us pay to regenerate them.
      `INSERT INTO translations_cache (question_id, lang, translated_text, explanation)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(question_id, lang) DO UPDATE SET
         translated_text = excluded.translated_text,
         explanation = excluded.explanation`
    )
    .bind(questionId, lang, translatedText, explanation)
    .run();
}

/**
 * §15.2: Update only the theory_text column for an existing cache row.
 * Uses INSERT OR IGNORE first so a row always exists before UPDATE.
 */
export async function updateTheoryCache(
  db: D1Database,
  questionId: number,
  lang: string,
  theoryText: string
): Promise<void> {
  // Ensure the row exists (may not if translation hasn't been fetched yet for this question)
  await db
    .prepare(
      `INSERT OR IGNORE INTO translations_cache (question_id, lang, translated_text) VALUES (?, ?, '')`
    )
    .bind(questionId, lang)
    .run();
  await db
    .prepare(
      `UPDATE translations_cache SET theory_text = ? WHERE question_id = ? AND lang = ?`
    )
    .bind(theoryText, questionId, lang)
    .run();
}

/**
 * §15.2: Update grammar_analysis and vocab_suggestions columns for an existing cache row.
 */
export async function updateGrammarCache(
  db: D1Database,
  questionId: number,
  lang: string,
  grammarAnalysis: string,
  vocabSuggestions: string // JSON string
): Promise<void> {
  await db
    .prepare(
      `INSERT OR IGNORE INTO translations_cache (question_id, lang, translated_text) VALUES (?, ?, '')`
    )
    .bind(questionId, lang)
    .run();
  await db
    .prepare(
      `UPDATE translations_cache
       SET grammar_analysis = ?, vocab_suggestions = ?
       WHERE question_id = ? AND lang = ?`
    )
    .bind(grammarAnalysis, vocabSuggestions, questionId, lang)
    .run();
}


// ── Vocab items ───────────────────────────────────────────────────────────────

export async function insertVocabItem(
  db: D1Database,
  userId: number,
  termIt: string,
  termFa: string,
  note: string | null,
  sourceQuestionId: number | null
): Promise<DbVocabItem> {
  const nextReviewAt = addDaysISO(todayLocalISO(), 1);

  const result = await db
    .prepare(
      `INSERT INTO vocab_items (user_id, term_it, term_fa, note, source_question_id, next_review_at)
       VALUES (?, ?, ?, ?, ?, ?) RETURNING *`
    )
    .bind(userId, termIt, termFa, note, sourceQuestionId, nextReviewAt)
    .first<DbVocabItem>();
  if (!result) throw new Error("Failed to insert vocab item");
  return result;
}

export async function getVocabItems(
  db: D1Database,
  userId: number
): Promise<DbVocabItem[]> {
  const result = await db
    .prepare(`SELECT * FROM vocab_items WHERE user_id = ? ORDER BY created_at DESC`)
    .bind(userId)
    .all<DbVocabItem>();
  return result.results;
}

export async function getDueVocabItems(
  db: D1Database,
  userId: number
): Promise<DbVocabItem[]> {
  const today = todayLocalISO();
  const result = await db
    .prepare(
      `SELECT * FROM vocab_items
       WHERE user_id = ? AND (next_review_at IS NULL OR next_review_at <= ?)
       ORDER BY next_review_at`
    )
    .bind(userId, today)
    .all<DbVocabItem>();
  return result.results;
}

/** Returns false when the item does not exist or belongs to another user. */
export async function updateVocabSRS(
  db: D1Database,
  userId: number,
  itemId: number,
  intervalDays: number,
  nextReviewAt: string
): Promise<boolean> {
  const result = await db
    .prepare(
      `UPDATE vocab_items SET interval_days = ?, next_review_at = ? WHERE id = ? AND user_id = ?`
    )
    .bind(intervalDays, nextReviewAt, itemId, userId)
    .run();
  return result.meta.changes > 0;
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export interface TopicAccuracy {
  topic_id: number;
  name_it: string;
  name_fa: string | null;
  total: number;
  correct: number;
  accuracy: number;
}

export async function getTopicAccuracy(
  db: D1Database,
  userId: number
): Promise<TopicAccuracy[]> {
  const result = await db
    .prepare(
      `SELECT
         q.topic_id,
         t.name_it,
         t.name_fa,
         COUNT(*) as total,
         SUM(ea.is_correct) as correct,
         ROUND(SUM(ea.is_correct) * 1.0 / COUNT(*), 3) as accuracy
       FROM exam_answers ea
       JOIN exam_sessions es ON es.id = ea.session_id
       JOIN questions q ON q.id = ea.question_id
       LEFT JOIN topics t ON t.id = q.topic_id
       WHERE es.user_id = ? AND ea.user_answer IS NOT NULL
       GROUP BY q.topic_id
       ORDER BY accuracy ASC`
    )
    .bind(userId)
    .all<TopicAccuracy>();
  return result.results;
}

export async function getStreak(db: D1Database, userId: number): Promise<number> {
  // Count consecutive days (ending today) with at least one finished session
  const result = await db
    .prepare(
      `SELECT DISTINCT date(started_at) as day
       FROM exam_sessions
       WHERE user_id = ? AND finished_at IS NOT NULL
       ORDER BY day DESC`
    )
    .bind(userId)
    .all<{ day: string }>();

  const days = result.results.map((r) => r.day);
  if (days.length === 0) return 0;

  const today = new Date().toISOString().slice(0, 10);
  let streak = 0;
  let expected = today;

  for (const day of days) {
    if (day === expected) {
      streak++;
      const d = new Date(expected);
      d.setDate(d.getDate() - 1);
      expected = d.toISOString().slice(0, 10);
    } else {
      break;
    }
  }
  return streak;
}

export async function getRecentSessions(
  db: D1Database,
  userId: number,
  limit = 10
): Promise<DbExamSession[]> {
  const result = await db
    .prepare(
      `SELECT * FROM exam_sessions
       WHERE user_id = ? AND finished_at IS NOT NULL
       ORDER BY started_at DESC LIMIT ?`
    )
    .bind(userId, limit)
    .all<DbExamSession>();
  return result.results;
}

// ── Weak-topic practice ───────────────────────────────────────────────────────

/**
 * Returns the topic IDs with the worst accuracy (ascending) for the given user.
 * Requires at least one answered question per topic to appear.
 */
export async function getWorstTopicIds(
  db: D1Database,
  userId: number,
  n = 3
): Promise<number[]> {
  const result = await db
    .prepare(
      `SELECT q.topic_id,
              ROUND(SUM(ea.is_correct) * 1.0 / COUNT(*), 3) AS accuracy
       FROM exam_answers ea
       JOIN exam_sessions es ON es.id = ea.session_id
       JOIN questions q ON q.id = ea.question_id
       WHERE es.user_id = ? AND ea.user_answer IS NOT NULL AND q.topic_id IS NOT NULL
       GROUP BY q.topic_id
       ORDER BY accuracy ASC
       LIMIT ?`
    )
    .bind(userId, n)
    .all<{ topic_id: number; accuracy: number }>();
  return result.results.map((r) => r.topic_id);
}

/**
 * Draw `count` questions from the given topic IDs, least-recently-seen first.
 * Topic pools are small (a few hundred questions), so a hard cooldown like the
 * one in drawExamQuestions would exhaust them — ordering by last-seen gives the
 * same "stop showing me the same questions" effect without ever running dry.
 */
export async function drawQuestionsFromTopics(
  db: D1Database,
  userId: number,
  topicIds: number[],
  count = 30
): Promise<DbQuestion[]> {
  if (topicIds.length === 0) return [];
  const placeholders = topicIds.map(() => "?").join(",");
  const result = await db
    .prepare(
      `SELECT q.*, (
         SELECT MAX(ea.answered_at) FROM exam_answers ea
         JOIN exam_sessions es ON es.id = ea.session_id
         WHERE es.user_id = ? AND ea.question_id = q.id
       ) AS last_seen_at
       FROM questions q
       WHERE q.topic_id IN (${placeholders}) AND ${NOT_RETIRED}
       ORDER BY last_seen_at IS NOT NULL, last_seen_at ASC, RANDOM()
       LIMIT ?`
    )
    .bind(userId, ...topicIds, count)
    .all<DbQuestion>();
  return result.results;
}

// ── Sign cards (for the تابلوها teaching deck) ────────────────────────────────

export interface SignCard {
  imageUrl: string;
  nameIt: string;
  nameFa: string;
  meaningFa: string;
}

/**
 * One card per road sign: the sign's official name and what it means.
 *
 * تابلوها teaches, it does not quiz. Building the deck from the question bank —
 * even from only the statements marked VERO — gives true sentences that still
 * aren't a definition: the tow-away sign's card listed three facts about impound
 * lots and wheel clamps without ever saying "parking is prohibited". So meanings
 * live in their own table (migration 0009, seeded via
 * scripts/generate-sign-meanings.ts) instead of being derived from exam text.
 *
 * The true/false format belongs in the exam, which draws from the full bank
 * (see drawExamQuestions) and is unaffected by this query.
 */
export async function getSignCards(db: D1Database): Promise<SignCard[]> {
  const result = await db
    .prepare(
      `SELECT image_url AS imageUrl, name_it AS nameIt, name_fa AS nameFa,
              meaning_fa AS meaningFa
       FROM sign_meanings
       ORDER BY image_url`
    )
    .all<SignCard>();
  return result.results;
}

/**
 * The one sign card for a question's image, used to ground AI explanations.
 *
 * gpt-4o reads a sign's *direction* from pixels at ~89% (measured over the nine
 * destra/sinistra pairs in the bank: it mirrored doppia-curva-destra and
 * intersezione-T-sinistra, and calls passaggio-veicoli "a sinistra" when the
 * arrow points right). A wrong left/right in the explanation is not a small
 * error — it teaches the opposite rule.
 *
 * sign_meanings covers all 413 images, but its generated definitions are not
 * independently verified. Treat these as auxiliary hints and validate claims
 * against question-bank evidence before publishing learning explanations.
 */
export async function getSignCardForImage(
  db: D1Database,
  imageUrl: string
): Promise<SignCard | null> {
  return await db
    .prepare(
      `SELECT image_url AS imageUrl, name_it AS nameIt, name_fa AS nameFa,
              meaning_fa AS meaningFa
       FROM sign_meanings WHERE image_url = ?`
    )
    .bind(imageUrl)
    .first<SignCard>();
}

// ── Reels Feed (Vertical Educational Feed) ──────────────────────────────────

export interface ReelFeedItem {
  id: number;
  type: "sign" | "question" | "tip";
  question_id: number;
  text_it: string;
  correct_answer: number; // 1 = VERO, 0 = FALSO
  image_url: string | null;
  wrong_rate: number;
  topic_name_it: string | null;
  topic_name_fa: string | null;
  translated_text: string | null;
  explanation: string | null;
  tip_title_fa?: string;
  tip_keyword_it?: string;
}

/**
 * Retrieves a curated, randomized mix of items for the Patente Reels vertical feed.
 * Includes image questions (road signs), high wrong-rate questions (traps),
 * and general exam questions with cached translations if available.
 */
export async function getReelsFeedItems(
  db: D1Database,
  userId: number,
  limit = 20
): Promise<ReelFeedItem[]> {
  const result = await db
    .prepare(
      `SELECT 
         q.id AS question_id,
         q.text_it,
         q.correct_answer,
         q.image_url,
         q.wrong_rate,
         t.name_it AS topic_name_it,
         t.name_fa AS topic_name_fa,
         NULL AS translated_text,
         NULL AS explanation
       FROM questions q
       LEFT JOIN topics t ON q.topic_id = t.id
       WHERE ${NOT_RETIRED} AND NOT EXISTS (
         SELECT 1
         FROM exam_answers ea
         JOIN exam_sessions es ON es.id = ea.session_id
         WHERE ea.question_id = q.id
           AND es.user_id = ?
           AND es.finished_at IS NULL
           AND es.abandoned_at IS NULL
           AND es.started_at >= datetime('now', '-30 minutes')
           AND ea.user_answer IS NULL
       )
       ORDER BY RANDOM()
       LIMIT ?`
    )
    .bind(userId, limit)
    .all<{
      question_id: number;
      text_it: string;
      correct_answer: number;
      image_url: string | null;
      wrong_rate: number;
      topic_name_it: string | null;
      topic_name_fa: string | null;
      translated_text: string | null;
      explanation: string | null;
    }>();

  // Curated list of golden Patente B exam tips for variety
  const goldenTips = [
    {
      keyword: "SOLO / SOLTANTO",
      title: "نکته کلیدی: «فقط / تنها»",
      desc: "در آزمون پاتنته، گزینه‌هایی که کلماتی مثل SOLO یا SOLTANTO دارند در بیش از ۸۰٪ مواقع FALSO (نادرست) هستند، مگر در موارد استثنای صریح ایمنی!"
    },
    {
      keyword: "MAI / IN NESSUN CASO",
      title: "نکته کلیدی: «هرگز / تحت هیچ شرایطی»",
      desc: "کلمات مطلق مثل MAI معمولاً نشان‌دهنده یک قانون قاطع ایمنی هستند و اکثراً VERO (درست) می‌باشند."
    },
    {
      keyword: "DISPOSITIVO / DISPOSITIVI",
      title: "تجهیزات ایمنی خودرو",
      desc: "استفاده از کمربند (cintura) و کلاه ایمنی (casco) برای تمام سرنشینان اجباری (obbligatorio) است."
    },
    {
      keyword: "PRIMA DI / DOPO",
      title: "تقدم و تاخر در سبقت و دور زدن",
      desc: "همیشه قبل از هر تغییر مسیر (prima di svoltare) راهنما زدن و چک کردن آینه‌ها (specchi) اجباری است."
    },
    {
      keyword: "DISTANZA DI SICUREZZA",
      title: "فاصله ایمنی خودروها",
      desc: "فاصله ایمنی باید حداقل برابر با مسافتی باشد که خودرو در زمان واکنش راننده (tempo di reazione ~ 1 ثانیه) طی می‌کند."
    }
  ];

  const items: ReelFeedItem[] = result.results.map((row, idx) => {
    const isSign = !!row.image_url;
    // Every 4th item, if tip available, inject a golden tip metadata tag or mark as sign/question
    const isTipCandidate = idx % 4 === 3;
    const tipObj = isTipCandidate ? goldenTips[idx % goldenTips.length] : undefined;

    return {
      id: row.question_id,
      type: isTipCandidate ? "tip" : isSign ? "sign" : "question",
      question_id: row.question_id,
      text_it: row.text_it,
      correct_answer: row.correct_answer,
      image_url: row.image_url,
      wrong_rate: row.wrong_rate,
      topic_name_it: row.topic_name_it,
      topic_name_fa: row.topic_name_fa,
      translated_text: row.translated_text,
      explanation: row.explanation,
      tip_keyword_it: tipObj?.keyword,
      tip_title_fa: tipObj?.title
    };
  });

  return items;
}

// ── Profile screen queries ────────────────────────────────────────────────────

export interface BankCoverage {
  seen: number;
  total: number;
  pct: number;
  seenMoreThanOnce: number;
}

/**
 * Returns how many distinct questions this user has ever answered, the total
 * bank size, percentage coverage, and how many they've seen more than once.
 * NOTE: user scoping goes through exam_sessions — exam_answers has no direct
 * user_id column.
 */
export async function getBankCoverage(
  db: D1Database,
  userId: number
): Promise<BankCoverage> {
  const [seenRow, totalRow, repeatedRow] = await Promise.all([
    db
      .prepare(
        `SELECT COUNT(DISTINCT ea.question_id) AS seen
         FROM exam_answers ea
         JOIN exam_sessions es ON es.id = ea.session_id
         JOIN questions q ON q.id = ea.question_id
         WHERE es.user_id = ? AND ${NOT_RETIRED}`
      )
      .bind(userId)
      .first<{ seen: number }>(),
    db
      .prepare(`SELECT COUNT(*) AS total FROM questions q WHERE ${NOT_RETIRED}`)
      .first<{ total: number }>(),
    db
      .prepare(
        `SELECT COUNT(*) AS repeated
         FROM (
           SELECT ea.question_id
           FROM exam_answers ea
           JOIN exam_sessions es ON es.id = ea.session_id
           WHERE es.user_id = ?
           GROUP BY ea.question_id
           HAVING COUNT(*) >= 2
         )`
      )
      .bind(userId)
      .first<{ repeated: number }>(),
  ]);

  const seen = seenRow?.seen ?? 0;
  const total = totalRow?.total ?? 0;
  const pct = total > 0 ? Math.round((seen / total) * 1000) / 10 : 0;
  return { seen, total, pct, seenMoreThanOnce: repeatedRow?.repeated ?? 0 };
}

export interface NeedsMoreWorkItem {
  questionId: number;
  textIt: string;
  wrongCount: number;
  totalSeen: number;
  wrongRate: number;
  topicNameFa: string | null;
  topicNameIt: string | null;
}

/**
 * Returns questions with >= 2 wrong answers for this user, sorted worst-first.
 * Used for the "نیاز به تمرین بیشتر" list in the analysis section.
 */
export async function getNeedsMoreWork(
  db: D1Database,
  userId: number,
  limit = 10
): Promise<NeedsMoreWorkItem[]> {
  const result = await db
    .prepare(
      `SELECT
         ea.question_id                               AS questionId,
         q.text_it                                    AS textIt,
         SUM(CASE WHEN ea.is_correct = 0 THEN 1 ELSE 0 END) AS wrongCount,
         COUNT(*)                                     AS totalSeen,
         ROUND(
           SUM(CASE WHEN ea.is_correct = 0 THEN 1 ELSE 0 END) * 1.0 / COUNT(*),
           3
         )                                            AS wrongRate,
         t.name_fa                                    AS topicNameFa,
         t.name_it                                    AS topicNameIt
       FROM exam_answers ea
       JOIN exam_sessions es ON es.id = ea.session_id
       JOIN questions q ON q.id = ea.question_id
       LEFT JOIN topics t ON t.id = q.topic_id
       WHERE es.user_id = ? AND ea.user_answer IS NOT NULL AND ${NOT_RETIRED}
       GROUP BY ea.question_id
       HAVING SUM(CASE WHEN ea.is_correct = 0 THEN 1 ELSE 0 END) >= 2
       ORDER BY wrongCount DESC, wrongRate DESC
       LIMIT ?`
    )
    .bind(userId, limit)
    .all<NeedsMoreWorkItem>();
  return result.results;
}

export interface ScoreTrendPoint {
  sessionId: number;
  score: number | null;
  wrongCount: number | null;
  passed: number | null;
  startedAt: string;
  aiAssisted: number;
}

/**
 * Returns the last N finished exam sessions for the trend sparkline.
 * Ordered oldest-first so the sparkline reads left-to-right in time.
 */
export async function getScoreTrend(
  db: D1Database,
  userId: number,
  limit = 15
): Promise<ScoreTrendPoint[]> {
  const result = await db
    .prepare(
      `SELECT id AS sessionId, score, wrong_count AS wrongCount, passed, started_at AS startedAt,
              ai_assisted_at IS NOT NULL AS aiAssisted
       FROM exam_sessions
       WHERE user_id = ? AND mode = 'exam' AND finished_at IS NOT NULL
       ORDER BY started_at DESC
       LIMIT ?`
    )
    .bind(userId, limit)
    .all<ScoreTrendPoint>();
  // Reverse so the array is chronological (oldest → newest) for the sparkline
  return result.results.reverse();
}

// ── Admin & Telemetry ───────────────────────────────────────────────────────

export interface DbUserEvent {
  id: number;
  user_id: number;
  event_type: string;
  event_data: string | null;
  duration_seconds: number;
  created_at: string;
}

export interface DbApiUsageLog {
  id: number;
  user_id: number | null;
  service: string;
  model: string;
  action: string;
  prompt_tokens: number;
  completion_tokens: number;
  estimated_cost_usd: number;
  created_at: string;
}

export async function logUserEvent(
  db: D1Database,
  userId: number,
  eventType: string,
  eventData?: object | string,
  durationSeconds: number = 0
): Promise<void> {
  const dataStr = typeof eventData === "object" ? JSON.stringify(eventData) : (eventData || null);
  await db
    .prepare(
      `INSERT INTO user_events (user_id, event_type, event_data, duration_seconds) VALUES (?, ?, ?, ?)`
    )
    .bind(userId, eventType, dataStr, durationSeconds)
    .run();
}

export async function logApiUsage(
  db: D1Database,
  userId: number | null,
  service: string,
  modelName: string,
  action: string,
  promptTokens: number,
  completionTokens: number,
  estimatedCostUsd: number
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO api_usage_logs (user_id, service, model, action, prompt_tokens, completion_tokens, estimated_cost_usd)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(userId, service, modelName, action, promptTokens, completionTokens, estimatedCostUsd)
    .run();
}

// Deterministic for multiple grants recorded within the same second.
const USER_PLAN_SQL = `(SELECT g.kind FROM access_grants g
  WHERE g.user_id = u.id AND g.kind != 'block' ORDER BY g.created_at DESC, g.id DESC LIMIT 1)`;

export async function getAdminOverviewStats(db: D1Database): Promise<{
  totalUsers: number;
  activeTodayUsers: number;
  activeNowUsers: number;
  pendingUsers: number;
  totalExams: number;
  overallPassRate: number | null;
  totalActiveMinutes: number;
  totalApiCostUsd: number;
  totalApiCalls: number;
  totalEventsLogged: number;
  totalInteractions: number;
  joinedToday: number;
  joined7d: number;
  activeTrials: number;
  activePaid: number;
  expiredTrials: number;
  convertedUsers: number;
  revenueEur: number;
  revenue30dEur: number;
}> {
  const [userRow, activeTodayRow, activeNowRow, pendingRow, examRow, minutesRow, apiRow, eventsRow, interactionsRow, subscriptionRow, revenueRow] = await Promise.all([
    db.prepare(`SELECT COUNT(*) as count FROM users`).first<{ count: number }>(),
    db.prepare(`SELECT COUNT(DISTINCT user_id) as count FROM user_events WHERE created_at >= date('now')`).first<{ count: number }>(),
    db.prepare(`SELECT COUNT(DISTINCT user_id) as count FROM user_events WHERE created_at >= datetime('now', '-5 minutes')`).first<{ count: number }>(),
    db.prepare(`SELECT COUNT(*) as count FROM users WHERE is_approved = 0`).first<{ count: number }>(),
    // Assisted exams are counted as taken but never towards the pass rate.
    db.prepare(
      `SELECT COUNT(*) as total,
              SUM(CASE WHEN ai_assisted_at IS NULL THEN 1 ELSE 0 END) as unassisted_total,
              SUM(CASE WHEN passed = 1 AND ai_assisted_at IS NULL THEN 1 ELSE 0 END) as passed
       FROM exam_sessions WHERE finished_at IS NOT NULL`
    ).first<{ total: number; unassisted_total: number | null; passed: number | null }>(),
    db.prepare(
      `SELECT COALESCE(SUM(
         CASE WHEN tracked_seconds >= exam_seconds THEN tracked_seconds ELSE exam_seconds END
       ), 0) / 60 AS total_mins
       FROM (
         SELECT
           u.id,
           (SELECT COALESCE(SUM(e.duration_seconds), 0)
              FROM user_events e
             WHERE e.user_id = u.id
               AND e.event_type IN ('active_time', 'heartbeat')) AS tracked_seconds,
           (SELECT COALESCE(SUM(s.duration_seconds), 0)
              FROM exam_sessions s
             WHERE s.user_id = u.id) AS exam_seconds
         FROM users u
       ) active_by_user`
    ).first<{ total_mins: number }>(),
    db.prepare(`SELECT COUNT(*) as calls, COALESCE(SUM(estimated_cost_usd), 0) as total_cost FROM api_usage_logs`).first<{ calls: number; total_cost: number }>(),
    db.prepare(`SELECT COUNT(*) as count FROM user_events`).first<{ count: number }>(),
    db.prepare(`SELECT COUNT(*) as count FROM user_events WHERE event_type = 'interaction'`).first<{ count: number }>(),
    db.prepare(
      `SELECT
         COUNT(CASE WHEN u.created_at >= date('now') THEN 1 END) AS joinedToday,
         COUNT(CASE WHEN u.created_at >= datetime('now', '-7 days') THEN 1 END) AS joined7d,
         COUNT(CASE WHEN ${USER_PLAN_SQL} = 'trial' AND u.is_approved = 1
                          AND u.access_expires_at > datetime('now') THEN 1 END) AS activeTrials,
         COUNT(CASE WHEN ${USER_PLAN_SQL} = 'paid' AND u.is_approved = 1
                          AND u.access_expires_at > datetime('now') THEN 1 END) AS activePaid,
         COUNT(CASE WHEN ${USER_PLAN_SQL} = 'trial' AND u.is_approved = 1
                          AND u.access_expires_at <= datetime('now') THEN 1 END) AS expiredTrials,
         COUNT(CASE WHEN EXISTS (SELECT 1 FROM access_grants g WHERE g.user_id = u.id AND g.kind = 'trial')
                         AND EXISTS (SELECT 1 FROM access_grants g WHERE g.user_id = u.id AND g.kind = 'paid')
                    THEN 1 END) AS convertedUsers
       FROM users u`
    ).first<{
      joinedToday: number; joined7d: number; activeTrials: number;
      activePaid: number; expiredTrials: number; convertedUsers: number;
    }>(),
    db.prepare(
      `SELECT COALESCE(SUM(amount_eur), 0) AS revenueEur,
         COALESCE(SUM(CASE WHEN created_at >= datetime('now', '-30 days') THEN amount_eur ELSE 0 END), 0) AS revenue30dEur
       FROM access_grants WHERE kind = 'paid'`
    ).first<{ revenueEur: number; revenue30dEur: number }>(),
  ]);

  const totalExams = examRow?.total ?? 0;
  const unassistedExams = examRow?.unassisted_total ?? 0;
  const passedExams = examRow?.passed ?? 0;
  const overallPassRate = unassistedExams > 0 ? Math.round((passedExams / unassistedExams) * 100) : null;

  return {
    totalUsers: userRow?.count ?? 0,
    activeTodayUsers: activeTodayRow?.count ?? 0,
    activeNowUsers: activeNowRow?.count ?? 0,
    pendingUsers: pendingRow?.count ?? 0,
    totalExams,
    overallPassRate,
    totalActiveMinutes: Math.round(minutesRow?.total_mins ?? 0),
    totalApiCostUsd: parseFloat((apiRow?.total_cost ?? 0).toFixed(4)),
    totalApiCalls: apiRow?.calls ?? 0,
    totalEventsLogged: eventsRow?.count ?? 0,
    totalInteractions: interactionsRow?.count ?? 0,
    joinedToday: subscriptionRow?.joinedToday ?? 0,
    joined7d: subscriptionRow?.joined7d ?? 0,
    activeTrials: subscriptionRow?.activeTrials ?? 0,
    activePaid: subscriptionRow?.activePaid ?? 0,
    expiredTrials: subscriptionRow?.expiredTrials ?? 0,
    convertedUsers: subscriptionRow?.convertedUsers ?? 0,
    revenueEur: revenueRow?.revenueEur ?? 0,
    revenue30dEur: revenueRow?.revenue30dEur ?? 0,
  };
}

export interface AdminUserListItem {
  id: number;
  telegram_user_id: number;
  first_name: string | null;
  username: string | null;
  is_approved: number;
  access_expires_at: string | null;
  created_at: string;
  last_active_at: string | null;
  total_exams: number;
  passed_exams: number;
  total_active_minutes: number;
  tracked_active_minutes: number;
  exam_active_minutes: number;
  total_api_calls: number;
  total_api_tokens: number;
  total_api_cost_usd: number;
  // §18.5: vocab depth
  vocab_count: number;
  vocab_due: number;
  review_due: number;
  // §18.4: waste signal — API calls per finished exam
  api_per_exam: number;
  plan: AccessGrantRow['kind'] | null;
  trial_started_at: string | null;
  paid_count: number;
  paid_total_eur: number;
  first_paid_at: string | null;
  last_paid_at: string | null;
}

export async function getAdminUsersList(
  db: D1Database,
  search?: string,
  statusFilter?: string,
  sort?: string
): Promise<AdminUserListItem[]> {
  // Each aggregate is a correlated subquery to avoid cross-join multiplication.
  // Joining user_events + exam_sessions + api_usage_logs + vocab_items at once
  // causes SUM(duration_seconds) to be multiplied by the cardinality of the
  // other joins — producing astronomically wrong values.
  let query = `
    SELECT
      u.id,
      u.telegram_user_id,
      u.first_name,
      u.username,
      u.is_approved,
      u.access_expires_at,
      u.created_at,
      ${USER_PLAN_SQL} AS plan,
      (SELECT MIN(g.created_at) FROM access_grants g WHERE g.user_id = u.id AND g.kind = 'trial') AS trial_started_at,
      (SELECT COUNT(*) FROM access_grants g WHERE g.user_id = u.id AND g.kind = 'paid') AS paid_count,
      (SELECT COALESCE(SUM(g.amount_eur), 0) FROM access_grants g WHERE g.user_id = u.id AND g.kind = 'paid') AS paid_total_eur,
      (SELECT MIN(g.created_at) FROM access_grants g WHERE g.user_id = u.id AND g.kind = 'paid') AS first_paid_at,
      (SELECT MAX(g.created_at) FROM access_grants g WHERE g.user_id = u.id AND g.kind = 'paid') AS last_paid_at,
      (SELECT MAX(e.created_at)  FROM user_events e  WHERE e.user_id = u.id) AS last_active_at,
      (SELECT COALESCE(SUM(e.duration_seconds), 0) / 60
         FROM user_events e
        WHERE e.user_id = u.id
          AND e.event_type IN ('active_time', 'heartbeat'))                   AS tracked_active_minutes,
      (SELECT COALESCE(SUM(s.duration_seconds), 0) / 60
         FROM exam_sessions s WHERE s.user_id = u.id)                         AS exam_active_minutes,
      (SELECT COUNT(*) FROM exam_sessions s
         WHERE s.user_id = u.id AND s.finished_at IS NOT NULL)                AS total_exams,
      (SELECT COUNT(*) FROM exam_sessions s
         WHERE s.user_id = u.id AND s.finished_at IS NOT NULL AND s.passed = 1
           AND s.ai_assisted_at IS NULL)                                      AS passed_exams,
      (SELECT COUNT(*) FROM api_usage_logs api WHERE api.user_id = u.id)      AS total_api_calls,
      (SELECT COALESCE(SUM(api.prompt_tokens + api.completion_tokens), 0)
         FROM api_usage_logs api WHERE api.user_id = u.id)                    AS total_api_tokens,
      (SELECT COALESCE(SUM(api.estimated_cost_usd), 0)
         FROM api_usage_logs api WHERE api.user_id = u.id)                    AS total_api_cost_usd,
      (SELECT COUNT(*) FROM vocab_items v WHERE v.user_id = u.id)             AS vocab_count,
      (SELECT COUNT(*) FROM vocab_items v
         WHERE v.user_id = u.id
           AND (v.next_review_at <= date('now') OR v.next_review_at IS NULL)) AS vocab_due
      ,(SELECT COUNT(*) FROM review_queue rq
          WHERE rq.user_id = u.id AND rq.cleared = 0)                         AS review_due
    FROM users u
    WHERE 1=1
  `;
  const params: any[] = [];

  if (statusFilter === "approved") {
    query += ` AND u.is_approved = 1 AND (u.access_expires_at IS NULL OR u.access_expires_at > datetime('now'))`;
  } else if (statusFilter === "expired") {
    query += ` AND u.is_approved = 1 AND u.access_expires_at IS NOT NULL AND u.access_expires_at <= datetime('now')`;
  } else if (statusFilter === "pending") {
    query += ` AND u.is_approved = 0`;
  } else if (statusFilter === "blocked") {
    query += ` AND u.is_approved = -1`;
  } else if (statusFilter === "trial" || statusFilter === "paid") {
    query += ` AND plan = ? AND u.is_approved = 1 AND u.access_expires_at > datetime('now')`;
    params.push(statusFilter);
  } else if (statusFilter === "trial_expired") {
    query += ` AND plan = 'trial' AND u.is_approved = 1 AND u.access_expires_at <= datetime('now')`;
  } else if (statusFilter === "expiring") {
    query += ` AND u.is_approved = 1 AND u.access_expires_at > datetime('now') AND u.access_expires_at <= datetime('now', '+3 days')`;
  } else if (statusFilter === "unlimited") {
    query += ` AND u.is_approved = 1 AND u.access_expires_at IS NULL`;
  }

  if (search && search.trim()) {
    const term = `%${search.trim()}%`;
    query += ` AND (u.first_name LIKE ? OR u.username LIKE ? OR CAST(u.telegram_user_id AS TEXT) LIKE ?)`;
    params.push(term, term, term);
  }

  // Whitelisted: the sort value picks a fixed clause, never reaches SQL itself.
  query += sort === "cost"
    ? ` ORDER BY total_api_cost_usd DESC, last_active_at DESC NULLS LAST`
    : ` ORDER BY last_active_at DESC NULLS LAST`;

  const result = await db.prepare(query).bind(...params).all<AdminUserListItem>();

  return result.results.map((row) => {
    const exams = row.total_exams || 0;
    const apiCalls = row.total_api_calls || 0;
    const trackedMinutes = row.tracked_active_minutes || 0;
    const examMinutes = row.exam_active_minutes || 0;
    return {
      ...row,
      tracked_active_minutes: Math.round(trackedMinutes),
      exam_active_minutes: Math.round(examMinutes),
      total_active_minutes: Math.round(Math.max(trackedMinutes, examMinutes)),
      total_api_tokens: row.total_api_tokens || 0,
      total_api_cost_usd: parseFloat((row.total_api_cost_usd || 0).toFixed(4)),
      vocab_count: row.vocab_count || 0,
      vocab_due: row.vocab_due || 0,
      review_due: row.review_due || 0,
      api_per_exam: exams > 0 ? parseFloat((apiCalls / exams).toFixed(1)) : apiCalls,
    };
  });
}


export async function getUserActivityTimeline(
  db: D1Database,
  userId: number,
  limit: number = 50
): Promise<{
  user: DbUser | null;
  events: DbUserEvent[];
  sessions: DbExamSession[];
  apiLogs: DbApiUsageLog[];
  grants: AccessGrantRow[];
  interactionSummary: Array<{
    screen: string;
    control: string;
    action: string | null;
    clicks: number;
    last_clicked_at: string;
  }>;
  summary: {
    totalActiveMinutes: number;
    trackedActiveMinutes: number;
    examActiveMinutes: number;
    totalInteractions: number;
    totalApiCalls: number;
    totalApiTokens: number;
    totalApiCostUsd: number;
  };
}> {
  const [user, events, sessions, apiLogs, interactionSummary, eventSummary, examSummary, apiSummary, grants] = await Promise.all([
    db.prepare(`SELECT * FROM users WHERE id = ?`).bind(userId).first<DbUser>(),
    db.prepare(`SELECT * FROM user_events WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`).bind(userId, limit).all<DbUserEvent>(),
    db.prepare(`SELECT * FROM exam_sessions WHERE user_id = ? ORDER BY started_at DESC LIMIT ?`).bind(userId, 20).all<DbExamSession>(),
    db.prepare(`SELECT * FROM api_usage_logs WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`).bind(userId, 20).all<DbApiUsageLog>(),
    db.prepare(
      `SELECT
         COALESCE(json_extract(event_data, '$.screen'), 'unknown') AS screen,
         COALESCE(json_extract(event_data, '$.control'), 'unknown') AS control,
         json_extract(event_data, '$.action') AS action,
         COUNT(*) AS clicks,
         MAX(created_at) AS last_clicked_at
       FROM user_events
       WHERE user_id = ? AND event_type = 'interaction'
       GROUP BY screen, control, action
       ORDER BY clicks DESC, last_clicked_at DESC
       LIMIT 20`
    ).bind(userId).all<{
      screen: string;
      control: string;
      action: string | null;
      clicks: number;
      last_clicked_at: string;
    }>(),
    db.prepare(
      `SELECT
         COALESCE(SUM(CASE WHEN event_type IN ('active_time', 'heartbeat') THEN duration_seconds ELSE 0 END), 0) AS active_seconds,
         SUM(CASE WHEN event_type = 'interaction' THEN 1 ELSE 0 END) AS interactions
       FROM user_events WHERE user_id = ?`
    ).bind(userId).first<{ active_seconds: number; interactions: number }>(),
    db.prepare(
      `SELECT COALESCE(SUM(duration_seconds), 0) AS active_seconds
       FROM exam_sessions WHERE user_id = ?`
    ).bind(userId).first<{ active_seconds: number }>(),
    db.prepare(
      `SELECT
         COUNT(*) AS calls,
         COALESCE(SUM(prompt_tokens + completion_tokens), 0) AS tokens,
         COALESCE(SUM(estimated_cost_usd), 0) AS cost
       FROM api_usage_logs WHERE user_id = ?`
    ).bind(userId).first<{ calls: number; tokens: number; cost: number }>(),
    getAccessGrants(db, userId),
  ]);

  const trackedSeconds = eventSummary?.active_seconds ?? 0;
  const examSeconds = examSummary?.active_seconds ?? 0;

  return {
    user,
    events: events.results,
    sessions: sessions.results,
    apiLogs: apiLogs.results,
    grants,
    interactionSummary: interactionSummary.results,
    summary: {
      trackedActiveMinutes: Math.round(trackedSeconds / 60),
      examActiveMinutes: Math.round(examSeconds / 60),
      totalActiveMinutes: Math.round(Math.max(trackedSeconds, examSeconds) / 60),
      totalInteractions: eventSummary?.interactions ?? 0,
      totalApiCalls: apiSummary?.calls ?? 0,
      totalApiTokens: apiSummary?.tokens ?? 0,
      totalApiCostUsd: parseFloat((apiSummary?.cost ?? 0).toFixed(4)),
    },
  };
}

export async function getAdminRecentEvents(
  db: D1Database,
  limit: number = 30
): Promise<(DbUserEvent & { first_name: string | null; username: string | null })[]> {
  const result = await db
    .prepare(
      `SELECT e.*, u.first_name, u.username
       FROM user_events e
       LEFT JOIN users u ON u.id = e.user_id
       ORDER BY e.created_at DESC
       LIMIT ?`
    )
    .bind(limit)
    .all<DbUserEvent & { first_name: string | null; username: string | null }>();

  return result.results;
}

// ── §18.4: API cost breakdown by action ────────────────────────────────────

export interface ApiCostByAction {
  action: string;
  calls_today: number;
  cost_today: number;
  calls_week: number;
  cost_week: number;
  calls_total: number;
  cost_total: number;
}

/**
 * Returns API cost grouped by action for today, this week, and all-time.
 * Used in the admin cost-minimization section.
 */
export async function getApiCostByAction(db: D1Database): Promise<ApiCostByAction[]> {
  const result = await db
    .prepare(
      `SELECT
         action,
         SUM(CASE WHEN date(created_at) = date('now') THEN 1 ELSE 0 END)                       AS calls_today,
         SUM(CASE WHEN date(created_at) = date('now') THEN estimated_cost_usd ELSE 0 END)       AS cost_today,
         SUM(CASE WHEN created_at >= date('now', '-6 days') THEN 1 ELSE 0 END)                  AS calls_week,
         SUM(CASE WHEN created_at >= date('now', '-6 days') THEN estimated_cost_usd ELSE 0 END) AS cost_week,
         COUNT(*)                                                                                AS calls_total,
         COALESCE(SUM(estimated_cost_usd), 0)                                                   AS cost_total
       FROM api_usage_logs
       GROUP BY action
       ORDER BY cost_total DESC`
    )
    .all<ApiCostByAction>();

  return result.results.map((row) => ({
    action: row.action,
    calls_today: row.calls_today || 0,
    cost_today: parseFloat((row.cost_today || 0).toFixed(5)),
    calls_week: row.calls_week || 0,
    cost_week: parseFloat((row.cost_week || 0).toFixed(5)),
    calls_total: row.calls_total || 0,
    cost_total: parseFloat((row.cost_total || 0).toFixed(5)),
  }));
}

// ── Support inbox ────────────────────────────────────────────────────────────
// One thread per user, shared by the Mini App and the Telegram relay.
// See migrations/0010_support_messages.sql for the direction/read_at semantics.

export interface DbSupportMessage {
  id: number;
  user_id: number;
  direction: SupportDirection;
  body: string;
  source: string;
  read_at: string | null;
  created_at: string;
}

export interface SupportThreadSummary {
  user_id: number;
  telegram_user_id: number;
  first_name: string | null;
  username: string | null;
  is_approved: number;
  last_body: string | null;
  last_direction: SupportDirection | null;
  last_at: string | null;
  unread: number;
}

export async function insertSupportMessage(
  db: D1Database,
  userId: number,
  direction: SupportDirection,
  body: string,
  source: "app" | "telegram" | "auto"
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO support_messages (user_id, direction, body, source) VALUES (?, ?, ?, ?)`
    )
    .bind(userId, direction, body, source)
    .run();
}

/** Messages this user sent to support in the last minute, from any source. */
export async function countRecentInboundSupport(db: D1Database, userId: number): Promise<number> {
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS n FROM support_messages
       WHERE user_id = ? AND direction = 'in' AND created_at >= datetime('now', '-1 minute')`
    )
    .bind(userId)
    .first<{ n: number }>();
  return row?.n ?? 0;
}

/** Oldest first — the thread renders top-to-bottom like a chat. */
export async function getSupportThread(
  db: D1Database,
  userId: number,
  limit: number = 100
): Promise<DbSupportMessage[]> {
  const result = await db
    .prepare(
      `SELECT * FROM (
         SELECT * FROM support_messages WHERE user_id = ?
         ORDER BY created_at DESC, id DESC LIMIT ?
       ) ORDER BY created_at ASC, id ASC`
    )
    .bind(userId, limit)
    .all<DbSupportMessage>();
  return result.results;
}

/** Mark everything the given side had not yet seen as read. */
export async function markSupportThreadRead(
  db: D1Database,
  userId: number,
  side: "admin" | "user"
): Promise<void> {
  await db
    .prepare(
      `UPDATE support_messages SET read_at = datetime('now')
       WHERE user_id = ? AND direction = ? AND read_at IS NULL`
    )
    .bind(userId, unreadDirectionFor(side))
    .run();
}

export async function countUnreadSupport(
  db: D1Database,
  userId: number,
  side: "admin" | "user"
): Promise<number> {
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS n FROM support_messages
       WHERE user_id = ? AND direction = ? AND read_at IS NULL`
    )
    .bind(userId, unreadDirectionFor(side))
    .first<{ n: number }>();
  return row?.n ?? 0;
}

/**
 * Admin inbox: every user who has ever exchanged a message, newest activity
 * first, unread threads pinned to the top. Correlated subqueries rather than
 * joins for the same reason as getAdminUsersList — a join would multiply the
 * aggregates against each other.
 */
export async function getSupportThreads(
  db: D1Database,
  limit: number = 50
): Promise<SupportThreadSummary[]> {
  const result = await db
    .prepare(
      `SELECT
         u.id AS user_id,
         u.telegram_user_id,
         u.first_name,
         u.username,
         u.is_approved,
         (SELECT m.body      FROM support_messages m WHERE m.user_id = u.id
            ORDER BY m.created_at DESC, m.id DESC LIMIT 1)              AS last_body,
         (SELECT m.direction FROM support_messages m WHERE m.user_id = u.id
            ORDER BY m.created_at DESC, m.id DESC LIMIT 1)              AS last_direction,
         (SELECT MAX(m.created_at) FROM support_messages m WHERE m.user_id = u.id) AS last_at,
         (SELECT COUNT(*) FROM support_messages m
            WHERE m.user_id = u.id AND m.direction = 'in' AND m.read_at IS NULL)   AS unread
       FROM users u
       WHERE EXISTS (SELECT 1 FROM support_messages m WHERE m.user_id = u.id)
       ORDER BY (unread > 0) DESC, last_at DESC
       LIMIT ?`
    )
    .bind(limit)
    .all<SupportThreadSummary>();
  return result.results;
}

/** Total unread inbound messages — the badge on the admin panel. */
export async function countUnreadSupportTotal(db: D1Database): Promise<number> {
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS n FROM support_messages WHERE direction = 'in' AND read_at IS NULL`
    )
    .first<{ n: number }>();
  return row?.n ?? 0;
}

// ── Access reminders & owner settings ───────────────────────────────────────

export interface AccessOfferSettings {
  plansText: string;
  paymentText: string;
}

const SETTING_KEYS = { plansText: "plans_text", paymentText: "payment_text" } as const;

export async function getAccessOfferSettings(db: D1Database): Promise<AccessOfferSettings> {
  const rows = await db
    .prepare(`SELECT key, value FROM app_settings WHERE key IN (?, ?)`)
    .bind(SETTING_KEYS.plansText, SETTING_KEYS.paymentText)
    .all<{ key: string; value: string }>();
  const byKey = new Map(rows.results.map((r) => [r.key, r.value]));
  return {
    plansText: byKey.get(SETTING_KEYS.plansText) ?? "",
    paymentText: byKey.get(SETTING_KEYS.paymentText) ?? "",
  };
}

export async function saveAccessOfferSettings(db: D1Database, settings: AccessOfferSettings): Promise<void> {
  const upsert = `INSERT INTO app_settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`;
  await db.batch([
    db.prepare(upsert).bind(SETTING_KEYS.plansText, settings.plansText),
    db.prepare(upsert).bind(SETTING_KEYS.paymentText, settings.paymentText),
  ]);
}

export interface ReminderCandidate {
  id: number;
  telegram_user_id: number;
  first_name: string | null;
  access_expires_at: string;
  last_kind: AccessGrantRow["kind"] | null;
  last_days: number | null;
}

/** Approved users whose access window ends within ±3 days of now. */
export async function getReminderCandidates(db: D1Database): Promise<ReminderCandidate[]> {
  const result = await db
    .prepare(
      `SELECT u.id, u.telegram_user_id, u.first_name, u.access_expires_at,
         (SELECT g.kind FROM access_grants g WHERE g.user_id = u.id AND g.kind != 'block'
            ORDER BY g.created_at DESC, g.id DESC LIMIT 1) AS last_kind,
         (SELECT g.days FROM access_grants g WHERE g.user_id = u.id AND g.kind != 'block'
            ORDER BY g.created_at DESC, g.id DESC LIMIT 1) AS last_days
       FROM users u
       WHERE u.is_approved = 1 AND u.access_expires_at IS NOT NULL
         AND datetime(u.access_expires_at) > datetime('now', '-3 days')
         AND datetime(u.access_expires_at) <= datetime('now', '+3 days')`
    )
    .all<ReminderCandidate>();
  return result.results;
}

/** Reserve a reminder; false when it was already sent for this window. */
export async function claimAccessReminder(
  db: D1Database, userId: number, kind: string, expiresAt: string
): Promise<boolean> {
  const res = await db
    .prepare(`INSERT OR IGNORE INTO access_reminders (user_id, kind, expires_at) VALUES (?, ?, ?)`)
    .bind(userId, kind, expiresAt)
    .run();
  return (res.meta?.changes ?? 0) > 0;
}

/** Undo a claim whose Telegram send failed, so the next run retries it. */
export async function releaseAccessReminder(
  db: D1Database, userId: number, kind: string, expiresAt: string
): Promise<void> {
  await db
    .prepare(`DELETE FROM access_reminders WHERE user_id = ? AND kind = ? AND expires_at = ?`)
    .bind(userId, kind, expiresAt)
    .run();
}
