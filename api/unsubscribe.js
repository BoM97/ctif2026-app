import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { endpoint } = req.body || {};
    if (!endpoint) {
      return res.status(400).json({ error: "missing endpoint" });
    }

    const key = "sub:" + Buffer.from(endpoint).toString("base64").slice(0, 60);
    await kv.del(key);
    await kv.srem("sub:index", key);

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}