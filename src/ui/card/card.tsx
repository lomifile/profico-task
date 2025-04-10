import styles from "./card.module.scss";

export interface CardProps {
  title: string;
  image: string;
  category: string;
  author?: string;
}

export const Card = ({ title, image, category, author }: CardProps) => {
  return (
    <div className={styles.card}>
      <img src={image} className={styles["card-image"]} />
      <article className={styles["card-content"]}>
        <span className={styles["card-category"]}>{category}</span>
        <h3 className={styles["card-title"]}>{title}</h3>
        {author && <span className={styles["card-author"]}>{author}</span>}
      </article>
    </div>
  );
};
