import { SCHEDULE } from "../data/schedule";
export function useNextEvents(count = 3) {
  const now = new Date();
  return [...SCHEDULE]
    .filter((e) => new Date(e.date + "T" + e.startTime + ":00") >= now)
    .sort((a, b) => (a.date + "T" + a.startTime).localeCompare(b.date + "T" + b.startTime))
    .slice(0, count);
}
