import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import {
  CHAPTERS,
  PILOT_CHAPTER,
  lessonLinkForSourceId,
  lessonStepCount,
  relatedSourceIds,
  type Lesson,
  type Statement,
} from "../src/content/lessons.js";
import {
  buildTodayPath,
  orderPracticeCandidates,
  resolvePracticeQuestions,
  summarizeLessons,
  type LessonSummary,
} from "../src/lib/learning.js";
import type { DbQuestion } from "../src/db/queries.js";
import type { PracticeCandidate } from "../src/db/learning-queries.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

const [L1, L2, L3] = PILOT_CHAPTER.lessons;
const VISUAL_KINDS = new Set(["compare", "sequence", "diagram", "scenario", "order", "stopping", "markings", "assess", "manoeuvre"]);
/** Steps a mistake can be routed back to: every visual, plus the VERO/FALSO factor lists. */
const TEACHING_KINDS = new Set([...VISUAL_KINDS, "factors"]);
const ALL_LESSONS = CHAPTERS.flatMap((chapter) => chapter.lessons);

// ── Curated content ──────────────────────────────────────────────────────────

test("every lesson has the full teaching structure and 3–5 real practice questions", () => {
  assert.equal(PILOT_CHAPTER.lessons.length, 3);
  assert.equal(new Set(ALL_LESSONS.map((lesson) => lesson.id)).size, ALL_LESSONS.length, "lesson ids are unique across chapters");
  for (const lesson of ALL_LESSONS) {
    const kinds = lesson.steps.map((step) => step.kind);
    assert.equal(kinds[0], "intro", `${lesson.id} starts with its objective`);
    assert.ok(kinds.some((kind) => VISUAL_KINDS.has(kind)), `${lesson.id} has an instructional visual`);
    assert.ok(kinds.includes("terms"), `${lesson.id} teaches Italian terms`);
    assert.ok(kinds.includes("trap"), `${lesson.id} covers a wording trap`);
    assert.ok(lesson.minutes >= 3 && lesson.minutes <= 5, `${lesson.id} is a 3–5 minute lesson`);
    assert.ok(lesson.practice.length >= 3 && lesson.practice.length <= 5, `${lesson.id} has 3–5 practice questions`);

    const intro = lesson.steps[0];
    assert.ok(intro.kind === "intro" && intro.objective.length > 40 && intro.why.length > 40);
    for (const step of lesson.steps) {
      if (step.kind === "terms") {
        assert.ok(step.terms.length >= 4);
        for (const term of step.terms) assert.ok(term.it && term.fa, `${lesson.id} term has both languages`);
      }
    }
    for (const question of lesson.practice) {
      assert.ok(question.rule.length > 0, `${question.sourceId} cites the rule it was verified against`);
      assert.ok(question.why.length > 20 && question.translation.length > 20);
      const concept = lesson.steps[question.conceptStep];
      assert.ok(concept && TEACHING_KINDS.has(concept.kind), `${question.sourceId} routes back to a teaching step`);
    }
  }
});

test("chunked Italian reproduces the exact bank statement, so highlights never paraphrase it", () => {
  const statements: Statement[] = ALL_LESSONS.flatMap((lesson) => [
    ...lesson.practice,
    ...lesson.steps.flatMap((step) => (step.kind === "trap" ? step.examples : [])),
  ]);
  assert.ok(statements.length >= 15);
  for (const statement of statements) {
    const rebuilt = statement.chunks.map((chunk) => chunk.it).join(" ").replace(/\s+/g, " ");
    assert.equal(rebuilt, statement.textIt, `chunks of ${statement.sourceId}`);
    for (const chunk of statement.chunks) {
      if (chunk.verb) assert.match(chunk.verb, /^\S.* ← \S/, `${statement.sourceId} verb shows its infinitive`);
    }
  }
});

test("trap steps pair a true and a false statement that share the tempting word", () => {
  for (const lesson of ALL_LESSONS) {
    const trap = lesson.steps.find((step) => step.kind === "trap");
    assert.ok(trap && trap.kind === "trap");
    const answers = new Set(trap.examples.map((example) => example.answer));
    assert.deepEqual([...answers].sort(), [0, 1], `${lesson.id} trap shows both a VERO and a FALSO example`);
  }
});

test("question → lesson mappings are explicit, unambiguous, and cover every practice question", () => {
  const seen = new Map<string, string>();
  for (const lesson of ALL_LESSONS) {
    for (const group of lesson.related) {
      const step = lesson.steps[group.step];
      assert.ok(step && TEACHING_KINDS.has(step.kind), `${lesson.id} related group points at a teaching step`);
      for (const id of group.sourceIds) {
        assert.ok(!seen.has(id), `${id} is mapped to both ${seen.get(id)} and ${lesson.id}`);
        seen.set(id, lesson.id);
      }
    }
    for (const question of lesson.practice) {
      assert.equal(lessonLinkForSourceId(question.sourceId)?.lessonId, lesson.id);
    }
  }
  assert.equal(lessonLinkForSourceId("1"), null, "unmapped questions get no lesson link");
  assert.equal(lessonLinkForSourceId(null), null);
});

test("sources and the review date are recorded with the content", () => {
  for (const chapter of CHAPTERS) {
    assert.match(chapter.reviewedOn, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(chapter.sources.length >= 2);
    for (const source of chapter.sources) assert.match(source.url, /^https:\/\//);
  }
});

// ── Pure rules ──────────────────────────────────────────────────────────────

function summary(
  lesson: Lesson,
  state: LessonSummary["state"],
  step = 0,
  chapterId = PILOT_CHAPTER.id,
  updatedAt: string | null = state === "not_started" ? null : "2026-10-01 10:00:00"
): LessonSummary {
  return {
    id: lesson.id,
    chapterId,
    titleFa: lesson.titleFa,
    titleIt: lesson.titleIt,
    minutes: lesson.minutes,
    signs: lesson.signs,
    state,
    step,
    stepCount: lessonStepCount(lesson),
    practice: { answered: 0, correct: 0, total: lesson.practice.length },
    dueReview: 0,
    updatedAt,
  };
}

test("today's path gives a new learner exactly one clear starting lesson", () => {
  const path = buildTodayPath([summary(L1, "not_started"), summary(L2, "not_started"), summary(L3, "not_started")], 0);
  assert.equal(path.items.length, 1);
  assert.deepEqual(path.items[0], {
    kind: "lesson", mode: "start", lessonId: L1.id, titleFa: L1.titleFa, step: 0, stepCount: lessonStepCount(L1), minutes: L1.minutes,
  });
  assert.equal(path.minutes, L1.minutes);
});

test("today's path puts unfinished work first, then due review, and never exceeds three items", () => {
  const midway = buildTodayPath([summary(L1, "completed"), summary(L2, "in_progress", 5), summary(L3, "not_started")], 4);
  assert.deepEqual(midway.items.map((item) => item.kind), ["lesson", "review", "practice"]);
  const resume = midway.items[0];
  assert.ok(resume.kind === "lesson" && resume.mode === "continue" && resume.lessonId === L2.id);
  assert.ok(resume.minutes < L2.minutes, "resuming shows only the remaining time");

  const nextLesson = buildTodayPath([summary(L1, "completed"), summary(L2, "not_started"), summary(L3, "not_started")], 0);
  assert.deepEqual(nextLesson.items.map((item) => item.kind), ["lesson", "practice"]);
  assert.ok(nextLesson.items[0].kind === "lesson" && nextLesson.items[0].lessonId === L2.id);

  const allDone = buildTodayPath([summary(L1, "completed"), summary(L2, "completed"), summary(L3, "completed")], 50);
  assert.deepEqual(allDone.items.map((item) => item.kind), ["review", "practice"]);
  assert.ok(allDone.items[0].kind === "review" && allDone.items[0].count === 30, "review is capped at one session");
});

test("lesson state counts only this lesson's answers and due review items", () => {
  const [s1, s2] = summarizeLessons(
    PILOT_CHAPTER,
    [{ lesson_id: L1.id, step: 4, started_at: "", updated_at: "", completed_at: null }],
    [
      { lesson_id: L1.id, question_id: 2165, user_answer: 1, is_correct: 0 },
      { lesson_id: L1.id, question_id: 2155, user_answer: 1, is_correct: 1 },
    ],
    ["2163", "2356", "9999"]
  );
  assert.equal(s1.state, "in_progress");
  assert.deepEqual(s1.practice, { answered: 2, correct: 1, total: L1.practice.length });
  assert.equal(s1.dueReview, 1);
  assert.equal(s2.state, "not_started");
  assert.equal(s2.dueReview, 1);
});

test("a practice question whose bank text or answer drifted is excluded, not silently shown", () => {
  const row = (sourceId: string, text: string, answer: number): DbQuestion => ({
    id: Number(sourceId), source_id: sourceId, topic_id: 4, text_it: text, correct_answer: answer, image_url: null, wrong_rate: 0,
  });
  const [a, b, c, d] = L1.practice;
  const rows = [
    row(a.sourceId, a.textIt, a.answer),
    row(b.sourceId, b.textIt, 1 - b.answer),
    row(c.sourceId, `${c.textIt} (rev.)`, c.answer),
  ];
  const resolved = resolvePracticeQuestions(L1, rows);
  assert.deepEqual(resolved.questions.map((q) => q.content.sourceId), [a.sourceId]);
  assert.deepEqual(resolved.excluded, [b.sourceId, c.sourceId, d.sourceId]);
});

test("related practice serves due review first, then unseen, then lesson-only, then the longest-unseen", () => {
  const candidate = (id: number, extra: Partial<PracticeCandidate>): PracticeCandidate => ({
    id, source_id: String(id), topic_id: 4, text_it: "", correct_answer: 1, image_url: null, wrong_rate: 0,
    last_seen_at: null, is_due: 0, seen_in_lesson: 0, ...extra,
  });
  const ordered = orderPracticeCandidates(
    [
      candidate(1, { last_seen_at: "2026-09-20 10:00:00" }),
      candidate(2, { seen_in_lesson: 1 }),
      candidate(3, {}),
      candidate(4, { is_due: 1, last_seen_at: "2026-09-25 10:00:00" }),
      candidate(5, { last_seen_at: "2026-09-01 10:00:00" }),
    ],
    4,
    () => 0.5
  );
  assert.deepEqual(ordered.map((c) => c.id), [4, 3, 2, 5]);
});

// ── API against real SQL ──────────────────────────────────────────────────────

const BOT_TOKEN = "123456:learning-test";
const USER_A = 5001;
const USER_B = 5002;
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;

function setup() {
  const { db, raw } = createSqliteD1();
  raw.prepare(`INSERT INTO topics (id, name_it, name_fa, sort_order) VALUES (4, 'Segnali di precedenza', 'علائم اولویت', 4)`).run();
  const insert = raw.prepare(
    `INSERT INTO questions (id, source_id, topic_id, text_it, correct_answer, image_url) VALUES (?, ?, 4, ?, ?, NULL)`
  );
  const practice = new Map(ALL_LESSONS.flatMap((lesson) => lesson.practice.map((q) => [q.sourceId, q] as const)));
  for (const sourceId of new Set(ALL_LESSONS.flatMap(relatedSourceIds))) {
    const q = practice.get(sourceId);
    insert.run(Number(sourceId), sourceId, q ? q.textIt : `Bank statement ${sourceId}`, q ? q.answer : 1);
  }
  const user = raw.prepare(`INSERT INTO users (id, telegram_user_id, first_name, is_approved) VALUES (?, ?, ?, 1)`);
  user.run(1, USER_A, "A");
  user.run(2, USER_B, "B");
  const env = {
    DB: db,
    TELEGRAM_BOT_TOKEN: BOT_TOKEN,
    ALLOWED_TELEGRAM_USER_IDS: "1",
    PRIMARY_ADMIN_TELEGRAM_USER_ID: "1",
    LOG_CHANNEL_ID: "-100",
  } as AppEnv;

  async function call(telegramId: number | null, method: string, path: string, body?: unknown) {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (telegramId !== null) headers["X-Telegram-InitData"] = signedInitData(BOT_TOKEN, telegramId);
    const response = await worker.fetch(
      new Request(`https://example.test/api${path}`, {
        method,
        headers,
        body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body),
      }),
      env,
      ctx
    );
    return { status: response.status, body: (await response.json()) as Record<string, any> };
  }
  return { raw, call };
}

test("learning routes require a verified Telegram user", async () => {
  const { call } = setup();
  const res = await call(null, "GET", "/learn");
  assert.equal(res.status, 401);
});

test("a new learner starts lesson 1, resume is monotonic, and bad input is rejected", async () => {
  const { call } = setup();
  const home = await call(USER_A, "GET", "/learn");
  assert.equal(home.status, 200);
  assert.deepEqual(home.body.chapters.map((c: { id: string }) => c.id), CHAPTERS.map((c) => c.id));
  assert.deepEqual(home.body.chapters[0].lessons.map((l: LessonSummary) => l.state), ["not_started", "not_started", "not_started"]);
  assert.equal(home.body.today.items[0].lessonId, L1.id);

  const lesson = await call(USER_A, "GET", `/learn/lessons/${L1.id}`);
  assert.equal(lesson.status, 200);
  assert.equal(lesson.body.progress.state, "not_started");
  assert.equal(lesson.body.lesson.practice.length, L1.practice.length);
  assert.equal(lesson.body.lesson.stepCount, lessonStepCount(L1));

  assert.equal((await call(USER_A, "POST", `/learn/lessons/${L1.id}/progress`, { step: 3 })).body.step, 3);
  // A late retry of an older save must not move the learner backwards.
  assert.equal((await call(USER_A, "POST", `/learn/lessons/${L1.id}/progress`, { step: 1 })).body.step, 3);
  const reopened = await call(USER_A, "GET", `/learn/lessons/${L1.id}`);
  assert.deepEqual([reopened.body.progress.state, reopened.body.progress.step], ["in_progress", 3]);

  for (const bad of [{ step: -1 }, { step: 999 }, { step: "2" }, {}]) {
    assert.equal((await call(USER_A, "POST", `/learn/lessons/${L1.id}/progress`, bad)).status, 400);
  }
  assert.equal((await call(USER_A, "POST", `/learn/lessons/${L1.id}/progress`, "not json")).status, 400);
  assert.equal((await call(USER_A, "GET", "/learn/lessons/nope")).status, 404);
});

test("a wrong practice answer is stored once and queued for review exactly once, even when retried", async () => {
  const { raw, call } = setup();
  const q = L1.practice[0];
  const wrong = (1 - q.answer) as 0 | 1;
  const path = `/learn/lessons/${L1.id}/answer`;

  const first = await call(USER_A, "POST", path, { questionId: Number(q.sourceId), answer: wrong });
  assert.equal(first.status, 200);
  assert.deepEqual(
    [first.body.recorded, first.body.isCorrect, first.body.correctAnswer, first.body.queuedForReview],
    [true, false, q.answer, true]
  );

  const retry = await call(USER_A, "POST", path, { questionId: Number(q.sourceId), answer: wrong });
  assert.deepEqual([retry.body.recorded, retry.body.duplicate, retry.body.isCorrect], [false, true, false]);

  // A racing second tap with the other choice gets the stored first answer back.
  const changed = await call(USER_A, "POST", path, { questionId: Number(q.sourceId), answer: q.answer });
  assert.deepEqual([changed.body.duplicate, changed.body.userAnswer, changed.body.isCorrect], [true, wrong, false]);

  const review = raw.prepare(`SELECT wrong_count, cleared, next_review_at FROM review_queue WHERE user_id = 1 AND question_id = ?`).all(Number(q.sourceId));
  assert.equal(review.length, 1);
  assert.equal(review[0].wrong_count, 1);
  assert.equal(review[0].cleared, 0);
  assert.equal(raw.prepare(`SELECT COUNT(*) AS n FROM lesson_answers`).get()?.n, 1);

  const right = L1.practice[1];
  const ok = await call(USER_A, "POST", path, { questionId: Number(right.sourceId), answer: right.answer });
  assert.deepEqual([ok.body.isCorrect, ok.body.queuedForReview], [true, false]);
  assert.equal(raw.prepare(`SELECT COUNT(*) AS n FROM review_queue WHERE question_id = ?`).get(Number(right.sourceId))?.n, 0);

  assert.equal((await call(USER_A, "POST", path, { questionId: Number(L2.practice[0].sourceId), answer: 1 })).status, 404);
  assert.equal((await call(USER_A, "POST", path, { questionId: Number(q.sourceId), answer: 2 })).status, 400);
  assert.equal((await call(USER_A, "POST", path, { questionId: "2165", answer: 1 })).status, 400);
});

test("completion requires every practice answer, is idempotent, and updates today's path", async () => {
  const { call } = setup();
  const base = `/learn/lessons/${L1.id}`;
  await call(USER_A, "POST", `${base}/answer`, { questionId: Number(L1.practice[0].sourceId), answer: L1.practice[0].answer });

  const early = await call(USER_A, "POST", `${base}/complete`);
  assert.equal(early.status, 409);
  assert.equal(early.body.missing.length, L1.practice.length - 1);

  for (const q of L1.practice.slice(1)) {
    await call(USER_A, "POST", `${base}/answer`, { questionId: Number(q.sourceId), answer: (1 - q.answer) as 0 | 1 });
  }
  const done = await call(USER_A, "POST", `${base}/complete`);
  assert.equal(done.status, 200);
  assert.deepEqual(done.body.practice, { total: L1.practice.length, correct: 1, queuedForReview: L1.practice.length - 1 });
  assert.equal(done.body.next.lessonId, L2.id);

  const again = await call(USER_A, "POST", `${base}/complete`);
  assert.equal(again.body.completedAt, done.body.completedAt, "repeat taps keep the first completion time");

  const home = await call(USER_A, "GET", "/learn");
  assert.equal(home.body.chapters[0].lessons[0].state, "completed");
  // Mistakes are due tomorrow, so today's path moves on to lesson 2 + related practice.
  assert.deepEqual(home.body.today.items.map((i: { kind: string }) => i.kind), ["lesson", "practice"]);
  assert.equal(home.body.today.items[0].lessonId, L2.id);
});

test("one learner's progress, answers, and practice are invisible to another learner", async () => {
  const { raw, call } = setup();
  const q = L1.practice[0];
  await call(USER_A, "POST", `/learn/lessons/${L1.id}/progress`, { step: 5 });
  await call(USER_A, "POST", `/learn/lessons/${L1.id}/answer`, { questionId: Number(q.sourceId), answer: (1 - q.answer) as 0 | 1 });

  const other = await call(USER_B, "GET", `/learn/lessons/${L1.id}`);
  assert.deepEqual(other.body.progress, { state: "not_started", step: 0, completedAt: null });
  assert.deepEqual(other.body.answers, {});
  const otherHome = await call(USER_B, "GET", "/learn");
  assert.equal(otherHome.body.chapters[0].lessons[0].state, "not_started");
  assert.equal(otherHome.body.reviewDue, 0);

  // B answering the same question creates B's own row and leaves A's untouched.
  const bAnswer = await call(USER_B, "POST", `/learn/lessons/${L1.id}/answer`, { questionId: Number(q.sourceId), answer: q.answer });
  assert.equal(bAnswer.body.isCorrect, true);
  const rows = raw.prepare(`SELECT user_id, is_correct FROM lesson_answers ORDER BY user_id`).all();
  assert.deepEqual(rows.map((r) => [r.user_id, r.is_correct]), [[1, 0], [2, 1]]);

  const noCompleted = await call(USER_B, "POST", "/learn/practice", {});
  assert.equal(noCompleted.status, 409);
});

test("drifted bank rows are dropped from the lesson and cannot be answered", async () => {
  const { raw, call } = setup();
  const q = L3.practice[0];
  raw.prepare(`UPDATE questions SET correct_answer = ? WHERE id = ?`).run(1 - q.answer, Number(q.sourceId));
  const lesson = await call(USER_A, "GET", `/learn/lessons/${L3.id}`);
  assert.equal(lesson.body.lesson.practice.length, L3.practice.length - 1);
  assert.ok(!lesson.body.lesson.practice.some((p: { sourceId: string }) => p.sourceId === q.sourceId));
  const answer = await call(USER_A, "POST", `/learn/lessons/${L3.id}/answer`, { questionId: Number(q.sourceId), answer: 1 });
  assert.equal(answer.status, 404);
});

test("related practice runs through the exam runner and wrong answers link back to the lesson section", async () => {
  const { raw, call } = setup();
  const start = await call(USER_A, "POST", "/learn/practice", { lessonId: L2.id });
  assert.equal(start.status, 200);
  assert.equal(start.body.mode, "topic_practice");
  assert.equal(start.body.questions.length, 10);
  const allowed = new Set(relatedSourceIds(L2));
  for (const q of start.body.questions) assert.ok(allowed.has(String(q.questionId)));
  const session = raw.prepare(`SELECT user_id, mode FROM exam_sessions WHERE id = ?`).get(start.body.sessionId);
  assert.deepEqual([session?.user_id, session?.mode], [1, "topic_practice"]);

  const first = start.body.questions[0];
  const row = raw.prepare(`SELECT correct_answer FROM questions WHERE id = ?`).get(first.questionId);
  const answer = await call(USER_A, "POST", `/exam/${start.body.sessionId}/answer`, {
    questionId: first.questionId,
    answer: 1 - Number(row?.correct_answer),
  });
  assert.equal(answer.status, 200);
  assert.equal(answer.body.isCorrect, false);
  assert.equal(answer.body.lessonLink.lessonId, L2.id);
  assert.equal(typeof answer.body.lessonLink.step, "number");

  // Another user cannot answer inside this session.
  const intruder = await call(USER_B, "POST", `/exam/${start.body.sessionId}/answer`, { questionId: first.questionId, answer: 1 });
  assert.equal(intruder.status, 404);
});

// ── Client wiring ─────────────────────────────────────────────────────────────

test("the lesson client is loaded and never shows a save it did not get back from the server", () => {
  const shell = readFileSync("src/app/shell.tsx", "utf8");
  const client = readFileSync("public/js/learn.js", "utf8");
  assert.match(shell, /<script src="\/js\/learn\.js"><\/script>/);
  assert.match(shell, /renderLessonScreen\(\)/);
  // Answers render from the server's stored first answer, not the tapped value.
  assert.match(client, /state\.lesson\.answers\[q\.questionId\] = \{ userAnswer: res\.userAnswer, isCorrect: res\.isCorrect \}/);
  // Completion state is only entered after /complete succeeds.
  assert.match(client, /var res = await api\('POST', '\/learn\/lessons\/' \+ encodeURIComponent\(lessonId\) \+ '\/complete'\);\s+if \(requestId !== state\.lessonRequestId\) return;\s+state\.lessonCompletion = res;/);
  assert.doesNotMatch(client, /innerHTML = [^;]*\+ (?:term|lesson|content|q|example)\.[a-zA-Z]+ \+/, "content is escaped before innerHTML");
});
