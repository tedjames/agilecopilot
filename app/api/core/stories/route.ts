import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { userStories } from "@/db/schema";

const TEST_USER_ID = "b82bdd41-3e62-490b-bf00-3d8751e7dba8";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featureId = searchParams.get("featureId");

    if (!featureId || featureId === "undefined") {
      return NextResponse.json(
        { message: "Valid featureId is required" },
        { status: 400 }
      );
    }

    const query = db.query.userStories.findMany({
      where: (userStories, { and, eq }) =>
        and(eq(userStories.featureId, featureId)),
      orderBy: (userStories, { desc }) => [desc(userStories.createdAt)],
    });

    const stories = await query;
    return NextResponse.json(stories);
  } catch (error) {
    console.error("Failed to fetch user stories:", error);
    return NextResponse.json(
      { message: "Failed to fetch user stories", error },
      { status: 500 }
    );
  }
}
