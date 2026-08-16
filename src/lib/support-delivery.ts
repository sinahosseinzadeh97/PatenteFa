/**
 * Reliability boundary for an admin support reply.
 *
 * The in-app thread is the durable record. Persist it first, then make the
 * best-effort Telegram delivery. A transient Bot API/network failure must not
 * erase the message the admin just sent.
 */
export async function persistThenDeliverSupportReply(
  persist: () => Promise<void>,
  deliverToTelegram: () => Promise<boolean>
): Promise<boolean> {
  await persist();

  try {
    return await deliverToTelegram();
  } catch (error) {
    console.error("Telegram support delivery failed:", error);
    return false;
  }
}
