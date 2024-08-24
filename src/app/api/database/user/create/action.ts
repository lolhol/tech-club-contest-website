"use server";

import { getDatabase } from "@/internal/core";

export async function createUser(name: string, email: string) {
  const db = getDatabase();

  const existingUser: { id: number } | undefined = db
    .prepare("SELECT id FROM deleted_account WHERE name = ? AND email = ?;")
    .get(name, email) as unknown as { id: number } | undefined;

  if (existingUser) {
    db.prepare(
      `INSERT INTO account (name, email, lives_left, difficulty)
       SELECT name, email, lives_left, difficulty 
       FROM deleted_account 
       WHERE id = ?;`
    ).run(existingUser.id);

    db.prepare("DELETE FROM deleted_account WHERE id = ?;").run(
      existingUser.id
    );
  } else {
    db.prepare(
      "INSERT OR IGNORE INTO account (name, email) VALUES (?, ?);"
    ).run(name, email);
  }
}

/*
CREATE TABLE IF NOT EXISTS account (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        lives_left INTEGER DEFAULT 3,
        score INTEGER DEFAULT 0,
        best_score INTEGER DEFAULT 0,
        difficulty INTEGER DEFAULT 0
      );
*/
