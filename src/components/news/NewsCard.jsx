import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./NewsCard.module.css";

export default function NewsCard({ news, variant = "default" }) {
  if (!news) return null;

  // "feature" variant = big card. "default" = horizontal editorial card
  if (variant === "feature") {
    return (
      <article className={styles.featureCard}>
        <Link href={`/news/${news.slug}`} className={styles.featureImageLink}>
          <div className={styles.featureImageWrapper}>
            <Image
              src={news.image}
              alt={news.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              style={{ objectFit: "cover" }}
              className={styles.featureImg}
            />
            <div className={styles.featureImageOverlay} />
            <div className={styles.featureImageContent}>
              <span className={styles.featureCategory}>{news.category}</span>
              <h2 className={styles.featureTitle}>{news.title}</h2>
              <span className={styles.featureDate}>{news.date}</span>
            </div>
          </div>
        </Link>
        <div className={styles.featureExcerpt}>
          <p className="body-main">{news.excerpt}</p>
          <Link href={`/news/${news.slug}`} className={styles.readMore}>
            READ MORE →
          </Link>
        </div>
      </article>
    );
  }

  // Horizontal editorial card
  return (
    <article className={styles.card}>
      <Link href={`/news/${news.slug}`} className={styles.cardImageLink}>
        <div className={styles.cardImageWrapper}>
          <Image
            src={news.image}
            alt={news.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ objectFit: "cover" }}
            className={styles.cardImg}
          />
        </div>
      </Link>

      <div className={styles.cardBody}>
        <span className={styles.cardCategory}>{news.category}</span>
        <h3 className={styles.cardTitle}>
          <Link href={`/news/${news.slug}`}>{news.title}</Link>
        </h3>
        <span className={styles.cardDate}>{news.date}</span>
        <p className={styles.cardExcerpt}>{news.excerpt}</p>
        <Link href={`/news/${news.slug}`} className={styles.readMore}>
          READ MORE →
        </Link>
      </div>
    </article>
  );
}
