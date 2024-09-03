"use server";

import { getDatabase } from "@/internal/core";

export async function getGameDat(id: number) {
  const db = getDatabase();
  const gameDat = await db<
    { score: number; lives_left: number }[]
  >`SELECT score, lives_left FROM account WHERE id = ${id};`;
  return gameDat[0];
}

export async function getHighScore(id: number) {
  const db = getDatabase();
  const highscore = await db<
    {
      best_score: number;
    }[]
  >`SELECT best_score FROM account WHERE id = ${id};`;
  return highscore[0];
}
