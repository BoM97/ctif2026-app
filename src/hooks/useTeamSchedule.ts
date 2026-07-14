import { COMP_DAYS } from "../data/competition";

export interface TeamSlot {
  date: string;
  label: string;      // z.B. "WETTKAMPF"
  type: string;       // "Training" | "Wettkampf"
  discipline: string; // "Staffellauf" | "Hindernisbahn"
  dg: number;
  time: string;       // Startzeit
  to?: string;
  lane: string;
}

/** Alle Slots eines Teams (per Nummer), chronologisch sortiert. */
export function getTeamSlots(teamNr: number): TeamSlot[] {
  const out: TeamSlot[] = [];
  for (const day of COMP_DAYS) {
    for (const disc of day.disciplines) {
      for (const run of disc.runs) {
        for (const e of run.entries) {
          if (!e.pause && e.teamNr === teamNr) {
            out.push({
              date: day.date, label: day.label, type: day.type,
              discipline: disc.discipline, dg: run.dg,
              time: (run.time ?? run.from)!, to: run.to, lane: e.lane,
            });
          }
        }
      }
    }
  }
  return out.sort((a, b) =>
    (a.date + a.time).localeCompare(b.date + b.time)
  );
}

/** Aktuell laufender / nächster Slot bezogen auf "now". */
export function liveSlotStatus(slot: TeamSlot, now: Date): "past" | "now" | "upcoming" {
  const start = new Date(slot.date + "T" + slot.time + ":00");
  const end = slot.to ? new Date(slot.date + "T" + slot.to + ":00")
                      : new Date(start.getTime() + 10 * 60 * 1000); // 10 Min Standard
  if (now >= start && now < end) return "now";
  if (now >= end) return "past";
  return "upcoming";
}