import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { z } from "zod";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { features, InsertFeature } from "@/db/schema";

const TEST_USER_ID = "b82bdd41-3e62-490b-bf00-3d8751e7dba8";

// Add validation schema based on form inputs
const requestSchema = z.object({
  appName: z.string(),
  status: z.string(),
  type: z.string(),
  specifications: z.string(),
  featureBreakdown: z.string(),
  appId: z.string(),
});

// Schema for AI-generated features
const featuresResponseSchema = z.object({
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
    const appId = searchParams.get("appId");

    if (!appId) {
      return NextResponse.json(
        { message: "appId is required" },
        { status: 400 }
      );
    }

    const query = db.query.features.findMany({
      where: (features, { eq, and }) =>
        and(eq(features.appId, appId), eq(features.userId, TEST_USER_ID)),
      orderBy: (features, { desc }) => [desc(features.createdAt)],
    });

    const features = await query;
    return NextResponse.json(features);
  } catch (error) {
    console.error("Failed to fetch features:", error);
    return NextResponse.json(
      { message: "Failed to fetch features", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = requestSchema.parse(body);

    const { object: result } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: featuresResponseSchema,
      prompt: `Generate a detailed breakdown of features for an application named: ${validatedData.appName}.
        Type of features needed: ${validatedData.type}
        High-level specifications: ${validatedData.specifications}
        Specific feature requirements: ${validatedData.featureBreakdown}
        
        Generate a comprehensive list of features that align with these requirements. Each feature should include:
        - A clear, concise name
        - A detailed description
        - Technical specifications for implementation
        
        Focus on practical, implementable features that directly solve the specified needs.`,
    });

    // Save all generated features to the database
    const savedFeatures = await Promise.all(
      result.features.map((feature) =>
        db
          .insert(features)
          .values({
            appId: validatedData.appId,
            name: feature.name,
            shortDescription: feature.description,
            featureSpecs: feature.featureSpecs,
            status: validatedData.status,
            featureType: validatedData.type,
            userId: TEST_USER_ID,
          } satisfies InsertFeature)
          .returning()
      )
    );

    return NextResponse.json({ features: savedFeatures });
  } catch (error) {
    console.error("Failed to generate features:", error);
    return NextResponse.json(
      { message: "Failed to generate features", error },
      { status: 500 }
    );
  }
}
