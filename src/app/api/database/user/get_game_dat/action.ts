"use server";

import { getDatabase } from "@/internal/core";

export async function getGameDat(id: number) {
  const db = getDatabase();
  const gameDat: { score: number; lives_left: number } = db
    .prepare("SELECT score, lives_left FROM account WHERE id = ?;")
    .get(id) as unknown as { score: number; lives_left: number };
  return gameDat;
}

export async function getHighScore(id: number) {
  const db = getDatabase();
  const highscore: { best_score: number } = db
    .prepare("SELECT best_score FROM account WHERE id = ?;")
    .get(id) as unknown as { best_score: number };
  return highscore;
}
