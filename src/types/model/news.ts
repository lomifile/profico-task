export interface Articles {
  content: string;
  description: string;
  publishedAt: string;
  source: Source;
  title: string;
  url: string;
  urlToImage: string;
  author: string;
  favorite: boolean;
}

export interface Source {
  id: string | null;
  name: string;
}

export interface News {
  nextPageParam: unknown;
  status: "ok" | "failed";
  totalResults: number;
  articles: Articles[];
}
