import { describe, expect, it } from "vitest";
import { BUILD_INFO } from "../src/buildInfo";

describe("release build metadata", () => {
  it("identifies the current alpha build", () => {
    expect(BUILD_INFO.studio).toBe("Endgame Studio");
    expect(BUILD_INFO.githubAccount).toBe("ArkansasIo");
    expect(BUILD_INFO.version).toBe("1.0.0-alpha.1");
    expect(BUILD_INFO.buildId).toBe("D20DS-20261014-001");
    expect(BUILD_INFO.channel).toBe("alpha");
  });
});
