"use server";

import { getDatabase } from "@/internal/core";

export async function queueUserForDeletion(id: number) {
  const db = getDatabase();
  const transaction = db.transaction(() => {
    db.prepare(
      `INSERT INTO deleted_account (name, email, lives_left, difficulty)
       SELECT name, email, lives_left, difficulty 
       FROM account 
       WHERE id = ?;`
    ).run(id);

    db.prepare("DELETE FROM account WHERE id = ?;").run(id);
  });

  transaction();
}
