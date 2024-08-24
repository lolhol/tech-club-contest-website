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

  const highscore = db
    .prepare("SELECT best_score FROM account WHERE id = ?;")
    .get(id) as unknown as { best_score: number };

  if (new_score > highscore.best_score) {
    db.prepare("UPDATE account SET best_score = ? WHERE id = ?;").run(
      new_score,
      id
    );
  }

  db.prepare("UPDATE account SET score = ?, lives_left = ? WHERE id = ?;").run(
    new_score,
    new_lives,
    id
  );
}
