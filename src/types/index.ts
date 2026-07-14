export type Category = "girls" | "boys_mixed" | "vetter";
export type CategoryOrUnknown = Category | "unknown";

export interface FavoriteTeam {
  id: string;
  teamName: string;
  country: string;
  category: CategoryOrUnknown;
  aliases: string[];
}

export interface ResultRow {
  rank: number | null;
  teamName: string;
  country: string;
  startNumber: number | null;
  obstacleTime: number | null;
  obstacleErrors: number | null;
  relayTime: number | null;
  relayErrors: number | null;
  targetTime: number | null;
  totalScore: number | null;
  category: Category;
  lastUpdated: string;
}

export interface ResultsPayload {
  category: Category;
  rows: ResultRow[];
  fetchedAt: string;
  ok: boolean;
  warnings: string[];
  rawRowCount: number;
  detectedHeaders: string[];
}

export type ChangeType =
  | "new_result" | "rank_changed" | "entered_top_3" | "left_top_3"
  | "score_changed" | "obstacle_time_changed" | "relay_time_changed"
  | "error_points_changed" | "new_team_added"
  | "source_unavailable" | "source_recovered";

export interface ResultChange {
  category: Category;
  teamName: string;
  country: string;
  type: ChangeType;
  oldRank?: number | null;
  newRank?: number | null;
  oldTotalScore?: number | null;
  newTotalScore?: number | null;
  timestamp: string;
}

export type Audience = "fans" | "participants" | "delegations" | "all";
export type ScheduleType =
  | "competition" | "training" | "ceremony"
  | "food" | "meeting" | "transport" | "other";

export interface ScheduleEvent {
  id: string;
  date: string;
  startTime: string;
  endTime?: string;
  title: string;
  location?: string;
  audience: Audience;
  type: ScheduleType;
}

export interface BusStop { name: string; time: string | null; }
export interface BusConnection {
  id: string;
  dateRange: string;
  direction: string;
  stops: BusStop[];
}

export interface Accommodation {
  school: string;
  address: string;
  diningHall?: string;
  countries: string[];
  mapUrl?: string;
}
