import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { userStories } from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

const TEST_USER_ID = "b82bdd41-3e62-490b-bf00-3d8751e7dba8";

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

const UserStorySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  status: z.string().min(1, { message: "Please select a status." }),
  storyType: z.string().min(1, { message: "Please select a story type." }),
  techSpecType: z
    .string()
    .min(1, { message: "Please select a technical specification type." }),
  userStory: z
    .string()
    .min(10, { message: "User story must be at least 10 characters." }),
  acceptanceCriteria: z.string().min(10, {
    message: "Acceptance criteria must be at least 10 characters.",
  }),
  technicalSpecs: z.string().optional(),
  taskBreakdown: z.string().optional(),
  featureId: z
    .string()
    .uuid({ message: "Valid feature ID is required." })
    .optional(),
});

// POST - Create a new user story
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = UserStorySchema.parse(body);

    const newStory = await db
      .insert(userStories)
      .values({
        ...validatedData,
        tech_spec_type: validatedData.techSpecType,
        images: [], // Initialize with empty array
      })
      .returning();

    return NextResponse.json<ApiResponse<(typeof newStory)[0]>>({
      data: newStory[0],
      message: "User story created successfully",
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

    console.error("Failed to create user story:", error);
    return NextResponse.json(
      { message: "Failed to create user story", error },
      { status: 500 }
    );
  }
}

// GET - Fetch a user story
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const storyId = searchParams.get("storyId");

    if (!storyId) {
      return NextResponse.json<ApiResponse<never>>(
        { error: "Story ID is required" },
        { status: 400 }
      );
    }

    const story = await db.query.userStories.findFirst({
      where: (userStories, { eq }) => eq(userStories.id, storyId),
    });

    if (!story) {
      return NextResponse.json<ApiResponse<never>>(
        { error: "User story not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<typeof story>>({ data: story });
  } catch (error) {
    console.error("Failed to fetch user story:", error);
    return NextResponse.json(
      { message: "Failed to fetch user story", error },
      { status: 500 }
    );
  }
}

// PUT - Update a user story
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const storyId = searchParams.get("storyId");

    if (!storyId) {
      return NextResponse.json<ApiResponse<never>>(
        { error: "Story ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = UserStorySchema.parse(body);

    const updatedStory = await db
      .update(userStories)
      .set(validatedData)
      .where(eq(userStories.id, storyId))
      .returning();

    if (!updatedStory.length) {
      return NextResponse.json<ApiResponse<never>>(
        { error: "User story not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<(typeof updatedStory)[0]>>({
      data: updatedStory[0],
      message: "User story updated successfully",
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
    console.error("Failed to update user story:", error);
    return NextResponse.json(
      { message: "Failed to update user story", error },
      { status: 500 }
    );
  }
}

// DELETE - Delete a user story
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const storyId = searchParams.get("storyId");

    if (!storyId) {
      return NextResponse.json<ApiResponse<never>>(
        { error: "Story ID is required" },
        { status: 400 }
      );
    }

    const deletedStory = await db
      .delete(userStories)
      .where(eq(userStories.id, storyId))
      .returning();

    if (!deletedStory.length) {
      return NextResponse.json<ApiResponse<never>>(
        { error: "User story not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<(typeof deletedStory)[0]>>({
      data: deletedStory[0],
      message: "User story successfully deleted",
    });
  } catch (error) {
    console.error("Failed to delete user story:", error);
    return NextResponse.json(
      { message: "Failed to delete user story", error },
      { status: 500 }
    );
  }
}
