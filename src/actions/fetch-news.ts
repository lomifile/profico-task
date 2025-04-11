"use server";
import { auth } from "@app/lib/auth";
import { db } from "@app/lib/db";
import { bookmarks } from "@app/lib/schema";
import { Articles } from "@app/types/model/news";
import { NextPageParam } from "@app/types/model/pagination-data";
import { buildfilter } from "@app/utils/build-filter";
import { eq } from "drizzle-orm";

const PAGE_SIZE = 100;
const MAX_DAYS = 100;

export const fetchNews = async (
  pageParam: NextPageParam = {
    q: "featured",
    date: "2025-04-10",
    page: 1,
    daysLoaded: 0,
  }
) => {
  const session = await auth();
  if (!session) throw new Error("No auth");
  const toDate = pageParam.date;
  const fromDate = new Date(toDate);
  fromDate.setDate(fromDate.getDate() - 1);
  const from = fromDate.toISOString().split("T")[0];

  const req = await fetch(
    buildfilter("https://newsapi.org/v2/everything", pageParam),
    {
      headers: {
        "X-Api-Key": process.env.API_KEY || "6d3d60411cdb413d9bdb61d9af8f4baa",
      },
      method: "GET",
    }
  );

  if (!req.ok) {
    console.log(await req.json());
    throw new Error("Error");
  }

  let { articles } = (await req.json()) as { articles: Articles[] };
  const favorites = await db.query.bookmarks.findMany({
    where: eq(bookmarks.userId, session.id),
  });

  articles = articles.map((article) => {
    const favorite = favorites.filter(
      (favorite) => favorite.data === article.url
    );
    if (favorite.length > 0) return { ...article, favorite: true };
    return { ...article, favorite: false };
  });

  return {
    articles,
    nextPageParam: {
      q: pageParam.q,
      page: pageParam.page + 1,
      date: articles.length < PAGE_SIZE ? from : toDate,
      daysLoaded: pageParam.daysLoaded + 1,
    },
    canLoadMore: pageParam.daysLoaded < MAX_DAYS,
  };
};
