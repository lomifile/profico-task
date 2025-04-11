import styles from "./bookmarks.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { GetAllBookmarks } from "@app/actions/get-bookmarks";
import { Card } from "@app/ui/card/card";
import { BookmarksResponse } from "@app/types/model/bookmarks";
import { Loading } from "../loading/loading";
import { CardGrid } from "../grid/grid";

export const Bookmarks = () => {
  const { data: session, status } = useSession();
  const { data, isLoading } = useQuery<BookmarksResponse>({
    queryKey: ["bookmarks", session?.id],
    queryFn: async () => await GetAllBookmarks(),
    enabled: status === "authenticated",
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles["bookmarks-container"]}>
      {data && (
        <CardGrid>
          {data?.data.map((item, idx) => {
            const el = JSON.parse(item.data);
            return (
              <Card
                title={el.title}
                image={el.urlToImage}
                category={el.source.name}
                key={`__card__${idx}`}
                author={el.author}
              />
            );
          })}
        </CardGrid>
      )}
      <div className={styles["mobile-cards"]}>
        {data?.data.map((item, idx) => {
          const el = JSON.parse(item.data);
          return (
            <Card
              title={el.title}
              image={el.urlToImage}
              category={el.source.name}
              key={`__card__${idx}`}
            />
          );
        })}
      </div>
    </div>
  );
};
