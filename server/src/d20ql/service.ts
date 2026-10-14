import type mysql from "mysql2/promise";
import { compileD20QL, type D20QLQuery } from "../../../src/d20ql/compiler.js";
import type { D20Program } from "../../../src/d20ql/types.js";

export async function executeD20QLOnMySQL(connection: mysql.Connection, program: D20Program): Promise<number> {
  const queries = compileD20QL(program);
  await connection.beginTransaction();
  try {
    for (const query of queries) await connection.execute(query.sql, query.params);
    await connection.commit();
    return queries.length;
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}

export function validateD20QLQueries(queries: D20QLQuery[]): void {
  for (const query of queries) {
    if (!query.sql.includes("?")) throw new Error("D20QL query contains no parameter placeholders");
    if ((query.sql.match(/\?/g) ?? []).length !== query.params.length) throw new Error("D20QL parameter count mismatch");
  }
}
