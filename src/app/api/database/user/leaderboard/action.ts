"use server";

import { getDatabase } from "@/internal/core";

export async function getLeaderboard() {
  const db = getDatabase();
  const leaderboard: { name: string; best_score: number }[] = db
    .prepare("SELECT name, best_score FROM account ORDER BY score DESC;")
    .all() as unknown as { name: string; best_score: number }[];

  const maxItems = 10;
  const cappedLeaderboard = leaderboard.slice(0, maxItems);

  return cappedLeaderboard;
}
