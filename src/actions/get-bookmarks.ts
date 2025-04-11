import { tryCatch } from "@app/utils/tryCatch";

export async function GetAllBookmarks() {
  const { data, error } = await tryCatch(
    (async () => {
      const req = await fetch("/api/bookmarks", {
        method: "GET",
      });

      if (!req.ok) {
        throw await req.json();
      }

      const data = await req.json();

      return data;
    })()
  );

  if (error) throw error;

  return data;
}
