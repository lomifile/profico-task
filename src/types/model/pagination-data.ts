import { Articles } from "./news";

export type NextPageParam = {
  q: string;
  page: number;
  date: string;
  daysLoaded: number;
};

export type PaginationData = {
  articles: Articles;
  nextPageParam: NextPageParam;
  canLoadMore: boolean;
};
