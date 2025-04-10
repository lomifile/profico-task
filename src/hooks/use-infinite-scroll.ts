import { useRef, useEffect } from "react";

export const useInfiniteScroll = (
  hasNextPage: boolean,
  fetchNextPage: () => void
) => {
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return [loadMoreRef];
};
