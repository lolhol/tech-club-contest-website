import Database from "better-sqlite3";

let DATABASE = new Database("./database.db");

export function getDatabase() {
  return DATABASE;
}
