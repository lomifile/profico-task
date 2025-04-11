"use server";
import { auth } from "@app/lib/auth";
import { db } from "@app/lib/db";
import { bookmarks } from "@app/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session) throw new Error("User unauthenticated");
  const data = await db.query.bookmarks.findMany({
    where: eq(bookmarks.userId, session.id),
  });

  return new NextResponse(
    JSON.stringify(
      {
        status: "ok",
        data,
      },
      null,
      2
    ),
    {
      status: 200,
    }
  );
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session) throw new Error("User unauthenticated");

  const article = await req.json();
  const match = await db.query.bookmarks.findFirst({
    where: eq(bookmarks.data, article.link),
  });

  if (match)
    return new NextResponse(JSON.stringify({ status: "ok" }), { status: 200 });

  const result = await db
    .insert(bookmarks)
    .values({
      userId: session.id,
      link: article.url,
      data: JSON.stringify(article),
    })
    .returning({ id: bookmarks.id });

  if (result.length === 0)
    throw new Error("There was an error while trying to add bookmark");

  return new NextResponse(
    JSON.stringify({
      status: "ok",
      result,
    }),
    {
      status: 201,
    }
  );
}
