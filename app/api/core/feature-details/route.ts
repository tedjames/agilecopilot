import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { eq, and } from "drizzle-orm";
import { features } from "@/db/schema";
import { z } from "zod";

const TEST_USER_ID = "b82bdd41-3e62-490b-bf00-3d8751e7dba8";

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

const FeatureSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  status: z
    .string({ required_error: "Please select a status." })
    .min(1, { message: "Please select a status." }),
  featureType: z.string({ required_error: "Please select a feature type." }),
  shortDescription: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  featureSpecs: z.string().optional(),
  storyBreakdown: z.string().optional(),
  appId: z.string().uuid({ message: "Valid application ID is required." }),
});

// GET - Fetch a feature
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featureId = searchParams.get("featureId");

    if (!featureId) {
      return NextResponse.json<ApiResponse<never>>(
        { error: "Feature ID is required" },
        { status: 400 }
      );
    }

    const feature = await db.query.features.findFirst({
      where: (features, { eq, and }) =>
        and(eq(features.id, featureId), eq(features.userId, TEST_USER_ID)),
    });

    if (!feature) {
      return NextResponse.json<ApiResponse<never>>(
        { error: "Feature not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<typeof feature>>({ data: feature });
  } catch (error) {
    console.error("Failed to fetch feature details:", error);
    return NextResponse.json(
      { message: "Failed to fetch feature details", error },
      { status: 500 }
    );
  }
}

// POST - Create a new feature
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = FeatureSchema.parse(body);

    const newFeature = await db
      .insert(features)
      .values({
        ...validatedData,
        userId: TEST_USER_ID,
      })
      .returning();

    return NextResponse.json<ApiResponse<(typeof newFeature)[0]>>({
      data: newFeature[0],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json<ApiResponse<never>>(
        {
          error: "Invalid data format",
          message: error.errors.map((e) => e.message).join(", "),
        },
        { status: 400 }
      );
    }
    console.error("Failed to create feature:", error);
    return NextResponse.json(
      { message: "Failed to create feature", error },
      { status: 500 }
    );
  }
}

// PUT - Update a feature
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featureId = searchParams.get("featureId");

    if (!featureId) {
      return NextResponse.json<ApiResponse<never>>(
        { error: "Feature ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = FeatureSchema.parse(body);

    const updatedFeature = await db
      .update(features)
      .set(validatedData)
      .where(and(eq(features.id, featureId), eq(features.userId, TEST_USER_ID)))
      .returning();

    if (!updatedFeature.length) {
      return NextResponse.json<ApiResponse<never>>(
        { error: "Feature not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<(typeof updatedFeature)[0]>>({
      data: updatedFeature[0],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json<ApiResponse<never>>(
        {
          error: "Invalid data format",
          message: error.errors.map((e) => e.message).join(", "),
        },
        { status: 400 }
      );
    }
    console.error("Failed to update feature:", error);
    return NextResponse.json(
      { message: "Failed to update feature", error },
      { status: 500 }
    );
  }
}

// DELETE - Delete a feature
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featureId = searchParams.get("featureId");

    if (!featureId) {
      return NextResponse.json<ApiResponse<never>>(
        { error: "Feature ID is required" },
        { status: 400 }
      );
    }

    const deletedFeature = await db
      .delete(features)
      .where(and(eq(features.id, featureId), eq(features.userId, TEST_USER_ID)))
      .returning();

    if (!deletedFeature.length) {
      return NextResponse.json<ApiResponse<never>>(
        { error: "Feature not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<(typeof deletedFeature)[0]>>({
      data: deletedFeature[0],
      message: "Feature successfully deleted",
    });
  } catch (error) {
    console.error("Failed to delete feature:", error);
    return NextResponse.json(
      { message: "Failed to delete feature", error },
      { status: 500 }
    );
  }
}
