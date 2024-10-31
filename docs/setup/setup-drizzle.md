# Backend Setup Instructions

Use this guide to setup the backend for this project.

It uses Supabase, Drizzle ORM, and Server Actions.

Write the complete code for every step. Do not get lazy. Write everything that is needed.

Your goal is to completely finish the backend setup.

## Helpful Links

If the user gets stuck, refer them to the following links:

- [Supabase](https://supabase.com/)
- [Drizzle Docs](https://orm.drizzle.team/docs/overview)
- [Drizzle with Supabase Quickstart](https://orm.drizzle.team/learn/tutorials/drizzle-with-supabase)

## Required Environment Variables

Make sure the user knows to set the following environment variables:

```bash
DATABASE_URL=
```

## Install Libraries

Make sure the user knows to install the following libraries:

```bash
npm i drizzle-orm dotenv postgres
npm i -D drizzle-kit
```

## Setup Steps

- Create a `/db` folder in the root of the project

- Create a `/types` folder in the root of the project

- Add a `drizzle.config.ts` file to the root of the project with the following code:

```ts
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

- Add a file called `db.ts` to the `/db` folder with the following code:

```ts
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { exampleTable } from "./schema";

config({ path: ".env.local" });

const schema = {
  exampleTable,
};

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client, { schema });
```

- Create 2 folders in the `/db` folder:

- `/schema`
  - Add a file called `index.ts` to the `/schema` folder
- `/queries`

- Create an example table in the `/schema` folder called `example-schema.ts` with the following code:

```ts
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const exampleTable = pgTable("example", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type InsertExample = typeof exampleTable.$inferInsert;
export type SelectExample = typeof exampleTable.$inferSelect;
```

- Export the example table in the `/schema/index.ts` file like so:

```ts
export * from "./example-schema";
```

- Create folder called `/types` in the root of the project for shared types
