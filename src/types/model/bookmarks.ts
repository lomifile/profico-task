export interface Bookmarks {
  id: string;
  link: string;
  data: string;
}

export interface BookmarksResponse {
  status: "ok" | "failed";
  data: Bookmarks[];
}
