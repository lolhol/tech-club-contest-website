"use server";

import postgres from "postgres";
import { getDatabase } from "@/internal/core";

export async function createUser(name: string, email: string) {
  const db = getDatabase();

  const existingUser = await db<{ id: number }[]>`
    SELECT id FROM deleted_account WHERE name = ${name} AND email = ${email};
  `;

  if (existingUser.length > 0) {
    const userId = existingUser[0].id;

    await db.begin(async (sql) => {
      // Move user back to the account_contest table
      await sql`
        INSERT INTO account_contest (name, email, lives_left, difficulty)
        SELECT name, email, lives_left, difficulty 
        FROM deleted_account 
        WHERE id = ${userId};
      `;

      // Delete user from the deleted_account table
      await sql`
        DELETE FROM deleted_account WHERE id = ${userId};
      `;
    });
  } else {
    await db`
      INSERT INTO account_contest (name, email) VALUES (${name}, ${email})
      ON CONFLICT DO NOTHING;
    `;
  }
}

/*
CREATE TABLE IF NOT EXISTS account_contest (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        lives_left INTEGER DEFAULT 3,
        score INTEGER DEFAULT 0,
        best_score INTEGER DEFAULT 0,
        difficulty INTEGER DEFAULT 0
      );
*/
