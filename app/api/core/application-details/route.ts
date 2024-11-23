import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { eq, and } from "drizzle-orm";
import { applications } from "@/db/schema";
import { z } from "zod";

const TEST_USER_ID = "b82bdd41-3e62-490b-bf00-3d8751e7dba8";

// Create a type for API responses
interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Define the validation schema here instead of importing from the form
const ApplicationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  status: z
    .string({ required_error: "Please select a status." })
    .min(1, { message: "Please select a status." }),
  type: z.string({ required_error: "Please select an app type." }),
  shortDescription: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  productSpecs: z
    .string()
    .min(20, { message: "Product specs must be at least 20 characters." }),
  featureBreakdown: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const appId = searchParams.get("appId");

    if (!appId) {
      return NextResponse.json<ApiResponse<never>>(
        {
          error: "Application ID is required",
        },
        { status: 400 }
      );
    }

    const application = await db.query.applications.findFirst({
      where: (applications, { eq, and }) =>
        and(eq(applications.id, appId), eq(applications.userId, TEST_USER_ID)),
    });

    if (!application) {
      return NextResponse.json<ApiResponse<never>>(
        {
          error: "Application not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<typeof application>>({
      data: application,
    });
  } catch (error) {
    console.error("Failed to fetch application details:", error);
    return NextResponse.json(
      { message: "Failed to fetch application details", error },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const appId = searchParams.get("appId");

    if (!appId) {
      return NextResponse.json<ApiResponse<never>>(
        {
          error: "Application ID is required",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Use the local schema instead of the imported one
    const validatedData = ApplicationSchema.parse(body);

    const updatedApplication = await db
      .update(applications)
      .set(validatedData)
      .where(
        and(eq(applications.id, appId), eq(applications.userId, TEST_USER_ID))
      )
      .returning();

    if (!updatedApplication.length) {
      return NextResponse.json<ApiResponse<never>>(
        {
          error: "Application not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<(typeof updatedApplication)[0]>>({
      data: updatedApplication[0],
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
    console.error("Failed to update application:", error);
    return NextResponse.json(
      { message: "Failed to update application", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const appId = searchParams.get("appId");

    if (!appId) {
      return NextResponse.json<ApiResponse<never>>(
        {
          error: "Application ID is required",
        },
        { status: 400 }
      );
    }

    const deletedApplication = await db
      .delete(applications)
      .where(
        and(eq(applications.id, appId), eq(applications.userId, TEST_USER_ID))
      )
      .returning();

    if (!deletedApplication.length) {
      return NextResponse.json<ApiResponse<never>>(
        {
          error: "Application not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<(typeof deletedApplication)[0]>>({
      data: deletedApplication[0],
      message: "Application successfully deleted",
    });
  } catch (error) {
    console.error("Failed to delete application:", error);
    return NextResponse.json(
      { message: "Failed to delete application", error },
      { status: 500 }
    );
  }
}
