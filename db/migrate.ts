import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { config } from "dotenv";

config({ path: ".env.local" });

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const connection = postgres(process.env.DATABASE_URL, {
    max: 1,
    prepare: false,
  });
  const db = drizzle(connection);

  console.log("⏳ Running migrations...");

  await migrate(db, { migrationsFolder: "db/migrations" });

  console.log("✅ Migrations completed!");

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed!");
  console.error(err);
  process.exit(1);
});
