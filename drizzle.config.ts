import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: { url: process.env.SUPABASE_DATABASE_URL as string },
  //   dbCredentials: {
  //     host: process.env.DB_HOST as string,
  //     user: process.env.DB_USER as string,
  //     password: process.env.DB_PASSWORD as string,
  //     port: parseInt(process.env.DB_PORT as string),
  //     database: process.env.DB_NAME as string,
  //   },
});
