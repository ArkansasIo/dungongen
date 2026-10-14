import { describe, expect, it } from "vitest";
import { compileD20QL } from "../src/d20ql/compiler";
import { parseD20QL } from "../src/d20ql/parser";

describe("D20QL compiler", () => {
  it("compiles the documented world/faction/turn/save program with parameters", () => {
    const program = parseD20QL(`D20QL 1.0
WORLD medieval "Aurelian Age" { SEED "oak-and-iron" MAP 48 x 32 TURN YEARLY }
FACTION "Aurelian Kingdom" { TREASURY 5000 POPULATION 10000 MILITARY 100 RESEARCH 20 }
TURN 1 { RESEARCH 150 RECRUIT 250 TRADE 100 }
SAVE CAMPAIGN "aurelian-age"`);
    const queries = compileD20QL(program);
    expect(queries).toHaveLength(6);
    expect(queries.every(q => q.sql.includes("?"))).toBe(true);
    expect(queries.reduce((n,q)=>n+q.params.length,0)).toBe(21);
  });
});
