"use server";

import { getDatabase } from "@/internal/core";

export async function getLeaderboard() {
  const db = getDatabase();
  const leaderboard = await db<{ name: string; best_score: number }[]>`sql
    SELECT name, best_score FROM account_contest ORDER BY best_score DESC`;

  return leaderboard.slice(0, 10);
}
