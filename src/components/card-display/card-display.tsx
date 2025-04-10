"use client";
import { fetchNews } from "@app/actions/fetch-news";
import styles from "./card-display.module.scss";
import { Card } from "@app/ui/card/card";
import { Spinner } from "@app/ui/custom-icons/spinner";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { Latest } from "../latest/latest";
import { LatestItem } from "../latest/latest-item";
import { News } from "@app/types/model/news";

export const CardDisplay = () => {
  const [currentDisplay, setCurrentDisplay] = useState("featured");
  const { data, isLoading } = useQuery<News>({
    queryKey: ["articles", currentDisplay],
    queryFn: async () => await fetchNews(currentDisplay),
  });

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
        <div className={styles["with-latest"]}>
          <div className={styles["grid-articles"]}>
            {data?.articles.slice(0, 4).map((el, idx) => (
              <Card
                title={el.title}
                image={el.urlToImage}
                category={el.source.name}
                key={`__card__${idx}`}
              />
            ))}
          </div>
          <div className={styles["latest-container"]}>
            <Latest>
              {data?.articles
                .sort(
                  (a, b) =>
                    new Date(b.publishedAt).getTime() -
                    new Date(a.publishedAt).getTime()
                )
                .map((el, idx: number) => (
                  <LatestItem data={el} key={`__latest_item_${idx}`} />
                ))}
            </Latest>
          </div>
        </div>
        <div className={styles["rest-grid-articles"]}>
          {data?.articles.slice(4).map((el, idx) => (
            <Card
              title={el.title}
              image={el.urlToImage}
              category={el.source.name}
              key={`__card__${idx}`}
            />
          ))}
        </div>
      </div>
      <div className={styles["mobile-cards"]}>
        {isLoading && <Spinner />}
        {currentDisplay === "featured" &&
          data?.articles.map((el, idx: number) => (
            <Card
              title={el.title}
              image={el.urlToImage}
              category={el.source.name}
              key={`__card__${idx}`}
            />
          ))}
      </div>
      {currentDisplay === "latest" && (
        <Latest>
          {data?.articles
            .sort(
              (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
            )
            .map((el, idx: number) => (
              <LatestItem data={el} key={`__latest_item_${idx}`} />
            ))}
        </Latest>
      )}
    </div>
  );
};
