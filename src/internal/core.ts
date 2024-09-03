import postgres from "postgres";

const sql = postgres(process.env.POSTGRESS_URL!);

export function getDatabase() {
  return sql;
}
