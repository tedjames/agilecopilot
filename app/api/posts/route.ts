import { db } from "@/db/db";
import { posts } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allPosts = await db.select().from(posts);
    return NextResponse.json(allPosts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newPost = await db
      .insert(posts)
      .values({
        title: body.title,
        content: body.content,
      })
      .returning();

    return NextResponse.json(newPost[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
