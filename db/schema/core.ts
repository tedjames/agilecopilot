import {
  pgTable,
  text,
  varchar,
  uuid,
  integer,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

// Users Table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkUserId: varchar("clerk_user_id", { length: 255 }).unique(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
  organizationName: varchar("organization_name", { length: 255 }),
  apiKey: text("api_key"),
  plan: varchar("plan", { length: 50 }).default("Basic"),
  monthlyTokens: integer("monthly_tokens").default(100), // Token limit based on plan
  tokensRemaining: integer("tokens_remaining").default(100), // Tracks remaining tokens
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Applications Table
export const applications = pgTable("applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).default("Refinement Needed"),
  type: varchar("type", { length: 50 }), // E.g., 'Web App'
  shortDescription: text("short_description"),
  productSpecs: text("product_specs"),
  featureBreakdown: text("feature_breakdown"), // Optional AI-generated breakdown
  images: jsonb("images"), // Array of image URLs
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Features Table
export const features = pgTable("features", {
  id: uuid("id").primaryKey().defaultRandom(),
  appId: uuid("app_id").references(() => applications.id, {
    onDelete: "cascade",
  }),
  name: varchar("name", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).default("Refinement Needed"),
  featureType: varchar("feature_type", { length: 50 }), // E.g., 'Frontend', 'Backend'
  shortDescription: text("short_description"),
  featureSpecs: text("feature_specs"), // Optional specs generated or input by user
  storyBreakdown: text("story_breakdown"), // Suggested breakdown
  images: jsonb("images"), // Array of image URLs
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User Stories Table
export const userStories = pgTable("user_stories", {
  id: uuid("id").primaryKey().defaultRandom(),
  featureId: uuid("feature_id").references(() => features.id, {
    onDelete: "cascade",
  }),
  name: varchar("name", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).default("Refinement Needed"),
  description: text("description"),
  userStory: text("user_story"), // Generated or user-provided details
  acceptanceCriteria: text("acceptance_criteria"), // Optional AI-generated criteria
  technicalSpecs: text("technical_specs"), // Optional AI-generated technical specs
  taskBreakdown: text("task_breakdown"), // Optional task breakdown
  images: jsonb("images"), // Array of image URLs
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Prompts Table
export const prompts = pgTable("prompts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  promptType: varchar("prompt_type", { length: 50 }).notNull(), // E.g., 'system', 'feature', 'story', 'techspec'
  subType: varchar("sub_type", { length: 50 }), // Specific type within 'feature' or 'story'
  content: text("content").notNull(), // The prompt text
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Plans Table
export const plans = pgTable("plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).unique().notNull(), // Basic, Pro, Enterprise
  monthlyTokens: integer("monthly_tokens").notNull(), // Monthly token allotment
  priceCents: integer("price_cents").notNull(), // Price in cents for Stripe
  createdAt: timestamp("created_at").defaultNow(),
});

// Token Transactions Table
export const tokenTransactions = pgTable("token_transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  tokens: integer("tokens").notNull(), // Number of tokens purchased or adjusted
  transactionType: varchar("transaction_type", { length: 50 }).notNull(), // 'purchase', 'adjustment', etc.
  createdAt: timestamp("created_at").defaultNow(),
});

// Actions Log Table (Optional)
export const actionsLog = pgTable("actions_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  action: varchar("action", { length: 50 }).notNull(), // 'generate', 'refine', 'expand'
  entityType: varchar("entity_type", { length: 50 }).notNull(), // 'feature', 'story', 'spec'
  entityId: uuid("entity_id"), // ID of related entity (application, feature, or story)
  inputData: jsonb("input_data"), // JSON blob for input used in AI call
  outputData: jsonb("output_data"), // JSON blob for AI response
  createdAt: timestamp("created_at").defaultNow(),
});

// Add type inference exports at the end of the file
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertApplication = typeof applications.$inferInsert;
export type SelectApplication = typeof applications.$inferSelect;

export type InsertFeature = typeof features.$inferInsert;
export type SelectFeature = typeof features.$inferSelect;

export type InsertUserStory = typeof userStories.$inferInsert;
export type SelectUserStory = typeof userStories.$inferSelect;

export type InsertPrompt = typeof prompts.$inferInsert;
export type SelectPrompt = typeof prompts.$inferSelect;

export type InsertPlan = typeof plans.$inferInsert;
export type SelectPlan = typeof plans.$inferSelect;

export type InsertTokenTransaction = typeof tokenTransactions.$inferInsert;
export type SelectTokenTransaction = typeof tokenTransactions.$inferSelect;

export type InsertActionsLog = typeof actionsLog.$inferInsert;
export type SelectActionsLog = typeof actionsLog.$inferSelect;
