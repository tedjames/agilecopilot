// /pages/api/core/app.ts
import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { applications, features, InsertFeature } from "@/db/schema";
import { z } from "zod";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { and, eq, desc } from "drizzle-orm";

const TEST_USER_ID = "b82bdd41-3e62-490b-bf00-3d8751e7dba8";

// Validation schema
const requestSchema = z.object({
  name: z.string(),
  status: z.string(),
  type: z.string(),
  shortDescription: z.string(),
  productSpecs: z.string(),
  featureBreakdown: z.string().optional(),
  images: z.array(z.string()).optional(),
});

// Modify the schema to be an object that contains the array
const featureSchema = z.object({
  features: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      featureSpecs: z.string(),
    })
  ),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const appId = searchParams.get("id");

    const results = await db.query.applications.findMany({
      where: appId
        ? (apps) => and(eq(apps.userId, TEST_USER_ID), eq(apps.id, appId))
        : (apps) => eq(apps.userId, TEST_USER_ID),
      orderBy: (apps) => [desc(apps.createdAt)],
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return NextResponse.json(
      { message: "Failed to fetch applications", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = requestSchema.parse(body);

    // Create the application with UUID for test user
    const app = await db
      .insert(applications)
      .values({
        userId: TEST_USER_ID,
        ...validatedData,
      })
      .returning();

    let generatedFeatures: any[] = [];

    // Optionally generate feature breakdown
    if (validatedData.featureBreakdown) {
      try {
        const { object: result } = await generateObject({
          model: openai("gpt-4o-mini"),
          schema: featureSchema,
          prompt: `Generate a breakdown of all possible features for the application named: ${validatedData.name}. Here's a brief description of the app: ${validatedData.shortDescription}. Here's a list of product specs: ${validatedData.productSpecs} and here's a breakdown of the features the user already knows that they want: ${validatedData.featureBreakdown}. Given all of the provided context, generate a list of features that would be most relevant to the user's needs. Database integrations should not be a feature but rather baked into the underlying functionality / use-case based features.`,
        });
        generatedFeatures = result.features;

        // Save generated features
        await Promise.all(
          generatedFeatures.map((feature: any) =>
            db.insert(features).values({
              appId: app[0].id,
              name: feature.name,
              shortDescription: feature.description,
              featureSpecs: feature.featureSpecs,
              status: "Refinement Needed",
              userId: TEST_USER_ID,
            } satisfies InsertFeature)
          )
        );
      } catch (error) {
        console.error("Error generating features:", error);
        return NextResponse.json(
          {
            message: "App created but failed to generate features...",
            error,
            warning: true,
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ features: generatedFeatures });
  } catch (error) {
    console.error("Failed to create application:", error);
    return NextResponse.json(
      { message: "Failed to create or update app...", error },
      { status: 500 }
    );
  }
}
