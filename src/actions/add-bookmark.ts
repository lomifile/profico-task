import { Articles } from "@app/types/model/news";
import { tryCatch } from "@app/utils/tryCatch";

export async function AddBookmark(item: Articles) {
  const { data, error } = await tryCatch(
    (async () => {
      const req = await fetch("/api/bookmarks", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
        method: "PATCH",
      });
      if (!req.ok)
        throw new Error("There was ane error while trying to add bookmark");

      return await req.json();
    })()
  );

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}
