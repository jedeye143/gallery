import React from "react";
import NewsCard from "./NewsCard";
import styles from "./NewsGrid.module.css";

export default function NewsGrid({ newsList }) {
  if (!newsList || newsList.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className="body-main">No news articles found.</p>
      </div>
    );
  }

  const [feature, ...rest] = newsList;

  return (
    <div className={styles.layout}>
      {/* Left column: feature big story */}
      <div className={styles.featureCol}>
        <NewsCard news={feature} variant="feature" />
      </div>

      {/* Right column: horizontal editorial list */}
      <div className={styles.listCol}>
        {rest.map((item) => (
          <NewsCard key={item.id} news={item} variant="default" />
        ))}
      </div>
    </div>
  );
}
