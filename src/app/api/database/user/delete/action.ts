"use server";

import { getDatabase } from "@/internal/core";

export async function queueUserForDeletion(id: number) {
  const db = getDatabase();

  await db.begin(async (sql) => {
    // Insert the user's details into the deleted_account table
    await sql`
      INSERT INTO deleted_account (name, email, lives_left, difficulty)
      SELECT name, email, lives_left, difficulty 
      FROM account 
      WHERE id = ${id};
    `;

    // Delete the user from the account table
    await sql`
      DELETE FROM account WHERE id = ${id};
    `;
  });
}
