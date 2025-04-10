"use client";

import { fetchNews } from "@app/actions/fetch-news";
import styles from "./card-display.module.scss";
import { Card } from "@app/ui/card/card";
import { Spinner } from "@app/ui/custom-icons/spinner";
import {
  DefaultError,
  InfiniteData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { Latest } from "../latest/latest";
import { LatestItem } from "../latest/latest-item";
import { useSearchParams } from "next/navigation";
import { useInfiniteScroll } from "@app/hooks/use-infinite-scroll";
import {
  NextPageParam,
  PaginationData,
} from "@app/types/model/pagination-data";
import { Loading } from "../loading/loading";

export const CardDisplay = () => {
  const queryParams = useSearchParams();
  let q = queryParams.get("q");
  if (!q) q = "featured";

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
    queryKey: ["articles", q],
    queryFn: async ({ pageParam }) => await fetchNews(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.canLoadMore ? lastPage.nextPageParam : undefined,
    initialPageParam: {
      q,
      date: new Date().toISOString().split("T")[0], // start from the latest date
      page: 1,
      daysLoaded: 0,
    },
  });

  const [ref] = useInfiniteScroll(hasNextPage, fetchNextPage);
  const data = news?.pages.flatMap((el) => el.articles) || [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles["cards-container"]}>
      <div className={styles["filter-container"]}>
        <button
          className={clsx(
            styles["filter-button"],
            currentDisplay === "featured" && styles["active"]
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
            currentDisplay === "latest" && styles["active"]
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
      <div className={styles["desktop-cards"]}>
        {isLoading && <Spinner />}
        {data && (
          <div className={styles["grid-articles"]}>
            {data?.slice(0, 2).map((el, idx) => (
              <Card
                title={el.title}
                image={el.urlToImage}
                category={el.source.name}
                key={`__card__${idx}`}
              />
            ))}
            <Latest className={styles["latest-items"]}>
              {data
                ?.sort(
                  (a, b) =>
                    new Date(b.publishedAt).getTime() -
                    new Date(a.publishedAt).getTime()
                )
                .map((el, idx: number) => (
                  <LatestItem data={el} key={`__latest_item_${idx}`} />
                ))}
            </Latest>
            {data?.slice(2).map((el, idx) => (
              <Card
                title={el.title}
                image={el.urlToImage}
                category={el.source.name}
                author={el.author}
                key={`__card__${idx}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles["mobile-cards"]}>
        {currentDisplay === "featured" &&
          data?.map((el, idx: number) => (
            <Card
              title={el.title}
              image={el.urlToImage}
              category={el.source.name}
              key={`__card__${idx}`}
            />
          ))}
      </div>
      {currentDisplay === "latest" && (
        <div className={styles["mobile-latest"]}>
          <Latest>
            {data
              ?.sort(
                (a, b) =>
                  new Date(b.publishedAt).getTime() -
                  new Date(a.publishedAt).getTime()
              )
              .map((el, idx: number) => (
                <LatestItem data={el} key={`__latest_item_${idx}`} />
              ))}
          </Latest>
        </div>
      )}
      <div ref={ref}>{isFetchingNextPage && <Loading />}</div>
    </div>
  );
};
