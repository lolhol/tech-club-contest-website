"use server";

import { getDatabase } from "@/internal/core";

export async function doesUserExist(
  email: string,
  password?: string,
  name?: string
): Promise<boolean> {
  const db = getDatabase();
  let res: { id: number }[] | undefined;

  if (!password && !name) {
    // Only email provided
    res = await db<{ id: number }[]>`
      SELECT id FROM account WHERE email = ${email};
    `;
  } else if (!password) {
    // Email and name provided
    res = await db<{ id: number }[]>`
      SELECT id FROM account WHERE email = ${email} AND name = ${name ?? ""};
    `;
  } else if (!name) {
    // Email and password provided
    res = await db<{ id: number }[]>`
      SELECT id FROM account WHERE email = ${email} AND password = ${password};
    `;
  } else {
    // Email, name, and password provided
    res = await db<{ id: number }[]>`
      SELECT id FROM account WHERE email = ${email} AND name = ${name} AND password = ${password};
    `;
  }

  return res && res.length > 0 ? true : false;
}
