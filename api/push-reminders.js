import { kv } from "@vercel/kv";
import webpush from "web-push";
import { STARTS } from "./_starts.js";

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT || "mailto:info@ctif2026.app",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const PRAGUE_OFFSET_HOURS = 2;

function nowInPrague() {
  const now = new Date();
  return new Date(now.getTime() + PRAGUE_OFFSET_HOURS * 3600 * 1000);
}

export default async function handler(req, res) {
  // Schutz: nur mit korrektem Secret aufrufbar
  const secret = process.env.CRON_SECRET;
  const provided = req.query.key || req.headers["x-cron-key"];
  if (secret && provided !== secret) {
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    const now = nowInPrague();
    const todayStr = now.toISOString().slice(0, 10);
    const nowMin = now.getUTCHours() * 60 + now.getUTCMinutes();

    const todaysStarts = STARTS.filter((s) => s.date === todayStr);
    if (todaysStarts.length === 0) {
      return res.status(200).json({ ok: true, sent: 0, note: "keine Starts heute" });
    }

    const keys = await kv.smembers("sub:index");
    let sent = 0;

    for (const key of keys) {
      const record = await kv.get(key);
      if (!record || !record.subscription) continue;

      const teamNumbers = record.teamNumbers || [];
      const lead = Number(record.reminderMinutes) || 15;
      if (teamNumbers.length === 0) continue;

      for (const s of todaysStarts) {
        if (!teamNumbers.includes(s.nr)) continue;

        const [h, m] = s.time.split(":").map(Number);
        const startMin = h * 60 + m;
        const diff = startMin - nowMin;

        if (diff <= lead && diff > lead - 1) {
          const dedupeKey = "fired:" + key + ":" + s.date + ":" + s.discipline + ":" + s.time;
          const already = await kv.get(dedupeKey);
          if (already) continue;
          await kv.set(dedupeKey, 1, { ex: 7200 });

          const payload = JSON.stringify({
            title: "CTIF 2026 – Start bald!",
            body: `Deine Gruppe (#${s.nr}): ${s.discipline} in ${diff} Min (${s.time}, ${s.lane})`,
            url: "/my-teams",
            tag: dedupeKey,
          });

          try {
            await webpush.sendNotification(record.subscription, payload);
            sent++;
          } catch (err) {
            if (err.statusCode === 404 || err.statusCode === 410) {
              await kv.del(key);
              await kv.srem("sub:index", key);
            }
          }
        }
      }
    }

    return res.status(200).json({ ok: true, sent });
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}