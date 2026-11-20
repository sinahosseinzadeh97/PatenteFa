/**
 * src/lib/notice-throttle.ts
 * Keeps one user from flooding the admin's log channel with repeat notices.
 */

const NOTICE_WINDOW_SECONDS = 3600;

/**
 * True the first time a key is seen in the window, then false until it ends.
 * KV is written only on that first call, so its one-write-per-second-per-key
 * limit is never in play. shortcut: KV is eventually consistent, so a burst
 * from two locations can let a second notice through; fine for a courtesy
 * throttle. If KV fails the notice is sent: a missed request is worse than a
 * duplicate.
 */
export async function firstNoticeInWindow(kv: KVNamespace, key: string): Promise<boolean> {
  try {
    if (await kv.get(key)) return false;
    await kv.put(key, "1", { expirationTtl: NOTICE_WINDOW_SECONDS });
  } catch (error) {
    console.error("notice throttle unavailable:", error);
  }
  return true;
}
