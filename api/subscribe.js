import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { subscription, teamNumbers, reminderMinutes } = req.body || {};

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ error: "invalid subscription" });
    }

    // Eindeutiger Schlüssel = Endpoint (als Base64 gekürzt)
    const key = "sub:" + Buffer.from(subscription.endpoint).toString("base64").slice(0, 60);

    const record = {
      subscription,
      teamNumbers: Array.isArray(teamNumbers) ? teamNumbers : [],
      reminderMinutes: Number(reminderMinutes) || 15,
      updatedAt: new Date().toISOString(),
    };

    // Speichern + in Index-Liste aufnehmen
    await kv.set(key, record);
    await kv.sadd("sub:index", key);

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}