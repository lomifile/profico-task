"use server";
import { NextPageParam } from "@app/types/model/pagination-data";
import { buildfilter } from "@app/utils/build-filter";

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

  const { articles } = await req.json();

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
