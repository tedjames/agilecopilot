import "dotenv/config";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/core";

if (!process.env.SUPABASE_DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Disable prefetch as it is not supported for "Transaction" pool mode
// export const client = postgres(process.env.SUPABASE_DATABASE_URL, {
//   prepare: false,
// });

export const client = drizzle(
  postgres(process.env.SUPABASE_DATABASE_URL!, {
    prepare: false,
  }),
  { schema }
);

declare global {
  var database: PostgresJsDatabase<typeof schema> | undefined;
}

// export const db = drizzle(client, { schema });

export const db = global.database || client;
if (process.env.NODE_ENV !== "production") global.database = db;
