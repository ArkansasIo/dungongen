import "dotenv/config";

function integerEnv(name: string, fallback: number, min: number): number {
  const raw = process.env[name];
  if (raw === undefined || raw === "") return fallback;
  const value = Number.parseInt(raw, 10);
  if (!Number.isInteger(value) || value < min) {
    throw new Error(`Invalid ${name}: expected an integer >= ${min}`);
  }
  return value;
}

function stringEnv(name: string, fallback: string): string {
  const value = process.env[name];
  return value === undefined || value === "" ? fallback : value;
}

export const config = {
  NODE_ENV: stringEnv("NODE_ENV", "development"),
  HOST: stringEnv("HOST", "0.0.0.0"),
  PORT: integerEnv("PORT", 3001, 1),
  DB_HOST: stringEnv("DB_HOST", "127.0.0.1"),
  DB_PORT: integerEnv("DB_PORT", 3306, 1),
  DB_NAME: stringEnv("DB_NAME", "d20_dungeon"),
  DB_USER: stringEnv("DB_USER", "d20"),
  DB_PASSWORD: stringEnv("DB_PASSWORD", ""),
  DB_POOL_SIZE: integerEnv("DB_POOL_SIZE", 10, 1),
  CORS_ORIGIN: stringEnv("CORS_ORIGIN", "*"),
} as const;
