export const BUILD_INFO = {
  studio: "Endgame Studio",
  githubAccount: "ArkansasIo",
  project: "D20 Dungeon Studio",
  version: "1.0.0-alpha.1",
  buildId: "D20DS-20261014-001",
  channel: "alpha",
} as const;

export type ReleaseChannel = typeof BUILD_INFO.channel;
