Use a codebase first approach. You have your TypeScript Drizzle schema as a source of truth and Drizzle let’s you generate SQL migration files based on your schema changes with drizzle-kit generate and then apply them to the database with drizzle-kit migrate commands.

```typescript src/schema.ts
import \* as p from "drizzle-orm/pg-core";
export const users = p.pgTable("users", {
id: p.serial().primaryKey(),
name: p.text(),
email: p.text().unique(),
};
```

┌────────────────────────┐  
│ $ drizzle-kit generate │  
└─┬──────────────────────┘  
 │  
 └ 1. read previous migration folders 2. find diff between current and previous schema 3. prompt developer for renames if necessary
┌ 4. generate SQL migration and persist to file
│ ┌─┴───────────────────────────────────────┐  
 │ 📂 drizzle  
 │ └ 📂 20242409125510_premium_mister_fear
│ ├ 📜 snapshot.json
│ └ 📜 migration.sql
v
-- drizzle/20242409125510_premium_mister_fear/migration.sql
CREATE TABLE "users" (
"id" SERIAL PRIMARY KEY,
"name" TEXT,
"email" TEXT UNIQUE
);
┌───────────────────────┐  
│ $ drizzle-kit migrate │  
└─┬─────────────────────┘  
 │ ┌──────────────────────────┐  
 └ 1. read migration.sql files in migrations folder │ │ 2. fetch migration history from database -------------> │ │
┌ 3. pick previously unapplied migrations <-------------- │ DATABASE │
└ 4. apply new migration to the database ---------------> │ │
│ │
└──────────────────────────┘
[✓] done!
