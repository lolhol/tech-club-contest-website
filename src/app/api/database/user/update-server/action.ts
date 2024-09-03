"use server";

import { getDatabase } from "@/internal/core";

/**
 *
 * @param id user Id
 * @param new_score the new current score
 * @param new_lives the new lives of the person
 * @meant this is meant to be called every time the user updates their score / something happens
 */
export async function updateServerWithClientData(
  id: number,
  new_score: number,
  new_lives: number
) {
  const db = getDatabase();

  const highscore = await db<
    {
      best_score: number;
    }[]
  >`SELECT best_score FROM account WHERE id = ${id};`;
  //.get(id) as unknown as { best_score: number };

  if (new_score > highscore[0].best_score) {
    await db`UPDATE account SET best_score = ${new_score} WHERE id = ${id};`;
  }

  await db`UPDATE account SET score = ${new_score}, lives_left = ${new_lives} WHERE id = ${id};`;
}
