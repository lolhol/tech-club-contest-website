"use server";

import { getDatabase } from "@/internal/core";

export async function activateUser(userId: number) {
  const db = getDatabase();

  await db`UPDATE account_contest SET first = false WHERE id = ${userId};`;
}
