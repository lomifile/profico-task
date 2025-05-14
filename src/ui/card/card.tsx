import { Bookmark } from "lucide-react";
import styles from "./card.module.scss";
import { useSession } from "next-auth/react";

export interface CardProps {
  title: string;
  image: string;
  category: string;
  markFavorite?: () => void;
  inFavorites?: boolean;
  author?: string;
}

export const Card = ({
  title,
  image,
  category,
  author,
  inFavorites,
  markFavorite,
}: CardProps) => {
  const { status } = useSession();
  return (
    <div className={styles.card}>
      <img src={image} className={styles["card-image"]} alt="logo" />
      {markFavorite && status === "authenticated" && (
        <button
          className={styles["bookmark-button"]}
          onClick={() => markFavorite()}
        >
          <Bookmark fill={inFavorites ? "red" : "transparent"} />
        </button>
      )}
      <article className={styles["card-content"]}>
        <span className={styles["card-category"]}>{category}</span>
        <h3 className={styles["card-title"]}>{title}</h3>
        {author && <span className={styles["card-author"]}>{author}</span>}
      </article>
    </div>
  );
};
