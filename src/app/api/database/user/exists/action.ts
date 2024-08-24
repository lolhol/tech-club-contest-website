"use server";

import { getDatabase } from "@/internal/core";

export async function doesUserExist(
  email: string,
  password: string | undefined,
  name: string | undefined
) {
  const db = getDatabase();
  let res: { id: number } | undefined;

  if (!password) {
    res = db
      .prepare("SELECT id FROM account WHERE email = ? AND name = ?;")
      .get(email, name) as unknown as { id: number } | undefined;
  } else if (!name) {
    res = db
      .prepare("SELECT id FROM account WHERE email = ? AND password = ?;")
      .get(email, password) as unknown as { id: number } | undefined;
  } else if (!name && !password) {
    res = db
      .prepare("SELECT id FROM account WHERE email = ?;")
      .get(email) as unknown as { id: number } | undefined;
  } else {
    res = db
      .prepare(
        "SELECT id FROM account WHERE email = ? AND name = ? AND password = ?;"
      )
      .get(email, name, password) as unknown as { id: number } | undefined;
  }

  console.log(JSON.stringify(res) + "??????" + (res !== undefined && res.id));

  return res !== undefined && res.id;
}
