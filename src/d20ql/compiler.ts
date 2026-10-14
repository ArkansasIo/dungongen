import type { D20Program, D20Statement } from "./types";

export interface D20QLQuery { sql: string; params: Array<string|number|boolean>; }

export function compileD20QL(program: D20Program): D20QLQuery[] {
  const queries: D20QLQuery[] = [];
  for (const statement of program.statements) {
    switch (statement.kind) {
      case "world":
        queries.push({ sql: "INSERT INTO d20_worlds (name,era,seed,width,height,turn_mode) VALUES (?,?,?,?,?,?)", params: [statement.name, statement.era, statement.seed, statement.width, statement.height, statement.turnMode] });
        break;
      case "faction":
        queries.push({ sql: "INSERT INTO d20_factions (name,treasury,population,military,research) VALUES (?,?,?,?,?)", params: [statement.name, statement.treasury, statement.population, statement.military, statement.research] });
        break;
      case "turn":
        for (const order of statement.orders) {
          queries.push({ sql: "INSERT INTO d20_turn_orders (turn_number,action,cost) VALUES (?,?,?)", params: [statement.number, order.action, order.cost] });
        }
        break;
      case "save":
        queries.push({ sql: "INSERT INTO d20_campaigns (name) VALUES (?)", params: [statement.name] });
        break;
    }
  }
  return queries;
}

export interface D20StorageAdapter {
  execute(query: D20QLQuery): Promise<void>;
}

export async function executeD20QL(program: D20Program, adapter: D20StorageAdapter): Promise<number> {
  const queries = compileD20QL(program);
  for (const query of queries) await adapter.execute(query);
  return queries.length;
}
