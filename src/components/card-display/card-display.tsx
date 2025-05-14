"use client";

import { fetchNews } from "@app/actions/fetch-news";
import styles from "./card-display.module.scss";
import { Card } from "@app/ui/card/card";
import {
  DefaultError,
  InfiniteData,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { Latest } from "../latest/latest";
import { LatestItem } from "../latest/latest-item";
import { useRouter, useSearchParams } from "next/navigation";
import { useInfiniteScroll } from "@app/hooks/use-infinite-scroll";
import { CardGrid } from "@app/components/grid/grid";
import {
  NextPageParam,
  PaginationData,
} from "@app/types/model/pagination-data";
import { Loading } from "../loading/loading";
import { Articles } from "@app/types/model/news";
import { AddBookmark } from "@app/actions/add-bookmark";

export const CardDisplay = () => {
  const queryParams = useSearchParams();
  let q = queryParams.get("q");
  let filter = queryParams.get("title");
  const router = useRouter();
  if (!filter) filter = "";
  if (!q) q = "featured";

  const { mutateAsync } = useMutation({
    mutationFn: async (item: Articles) => await AddBookmark(item),
  });

  const [currentDisplay, setCurrentDisplay] = useState("featured");
  const {
    data: news,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery<
    PaginationData,
    DefaultError,
    InfiniteData<PaginationData, NextPageParam>,
    string[],
    NextPageParam
  >({
    queryKey: ["articles", q, filter],
    queryFn: async ({ pageParam }) => await fetchNews(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.canLoadMore ? lastPage.nextPageParam : undefined,
    initialPageParam: {
      q,
      date: new Date().toISOString().split("T")[0],
      page: 1,
      daysLoaded: 0,
    },
  });

  const [ref] = useInfiniteScroll(hasNextPage, fetchNextPage);
  const data = news?.pages.flatMap((el) => el.articles) || [];

  const markAsFavorite = (el: Articles) => {
    router.refresh();
    mutateAsync(el);
    el.favorite = !el.favorite;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles["cards-container"]}>
      <div className={styles["filter-container"]}>
        <button
          className={clsx(
            styles["filter-button"],
            currentDisplay === "featured" && styles["active"],
          )}
          onClick={() => {
            setCurrentDisplay("featured");
          }}
        >
          Featured
        </button>
        <button
          className={clsx(
            styles["filter-button"],
            currentDisplay === "latest" && styles["active"],
          )}
          onClick={() => {
            setCurrentDisplay("latest");
          }}
        >
          Latest
        </button>
      </div>
      <div className={styles["cards-title"]}>
        <h3>News</h3>
      </div>
      {data && (
        <CardGrid>
          {data
            ?.slice(0, 2)
            .map((el, idx) => (
              <Card
                title={el.title}
                image={el.urlToImage}
                category={el.source.name}
                markFavorite={() => markAsFavorite(el)}
                inFavorites={el.favorite}
                key={`__card__${idx}`}
              />
            ))}
          <Latest className={styles["latest-items"]}>
            {data.map((el, idx: number) => (
              <LatestItem data={el} key={`__latest_item_${idx}`} />
            ))}
          </Latest>
          {data
            ?.slice(2)
            .map((el, idx) => (
              <Card
                title={el.title}
                image={el.urlToImage}
                category={el.source.name}
                author={el.author}
                key={`__card__${idx}`}
                markFavorite={() => markAsFavorite(el)}
                inFavorites={el.favorite}
              />
            ))}
        </CardGrid>
      )}
      <div className={styles["mobile-cards"]}>
        {currentDisplay === "featured" &&
          data?.map((el, idx: number) => (
            <Card
              title={el.title}
              image={el.urlToImage}
              category={el.source.name}
              key={`__card__${idx}`}
              markFavorite={() => markAsFavorite(el)}
              inFavorites={el.favorite}
            />
          ))}
      </div>
      {currentDisplay === "latest" && (
        <div className={styles["mobile-latest"]}>
          <Latest>
            {data?.map((el, idx: number) => (
              <LatestItem data={el} key={`__latest_item_${idx}`} />
            ))}
          </Latest>
        </div>
      )}
      <div ref={ref}>{isFetchingNextPage && <Loading />}</div>
    </div>
  );
};
