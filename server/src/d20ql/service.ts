import type mysql from "mysql2/promise";

type D20Statement =
  | { kind: "world"; era: string; name: string; seed: string; width: number; height: number; turnMode: string }
  | { kind: "faction"; name: string; treasury: number; population: number; military: number; research: number }
  | { kind: "turn"; number: number; orders: { action: string; cost: number }[] }
  | { kind: "save"; kindName: "CAMPAIGN"; name: string };
type D20Program = { version: string; statements: D20Statement[] };
type Query = { sql: string; params: Array<string | number | boolean> };

function compile(program: D20Program): Query[] {
  const queries: Query[] = [];
  for (const s of program.statements) {
    if (s.kind === "world") queries.push({ sql: "INSERT INTO d20_worlds (name,era,seed,width,height,turn_mode) VALUES (?,?,?,?,?,?)", params: [s.name,s.era,s.seed,s.width,s.height,s.turnMode] });
    else if (s.kind === "faction") queries.push({ sql: "INSERT INTO d20_factions (name,treasury,population,military,research) VALUES (?,?,?,?,?)", params: [s.name,s.treasury,s.population,s.military,s.research] });
    else if (s.kind === "turn") for (const order of s.orders) queries.push({ sql: "INSERT INTO d20_turn_orders (turn_number,action,cost) VALUES (?,?,?)", params: [s.number,order.action,order.cost] });
    else if (s.kind === "save") queries.push({ sql: "INSERT INTO d20_campaigns (name) VALUES (?)", params: [s.name] });
  }
  return queries;
}

export async function executeD20QLOnMySQL(connection: mysql.Connection, program: D20Program): Promise<number> {
  const queries = compile(program);
  await connection.beginTransaction();
  try {
    for (const query of queries) {
      if ((query.sql.match(/\\?/g) ?? []).length !== query.params.length) throw new Error("D20QL parameter count mismatch");
      await connection.execute(query.sql, query.params);
    }
    await connection.commit();
    return queries.length;
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}
