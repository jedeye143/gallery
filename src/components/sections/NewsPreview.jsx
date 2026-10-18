import React from "react";
import Link from "next/link";
import NewsGrid from "../news/NewsGrid";
import { getRecentNews } from "@/lib/newsHelpers";
import styles from "./NewsPreview.module.css";

export default function NewsPreview() {
  const newsItems = getRecentNews(3);

  return (
    <section
      className="section-padding"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-light)",
      }}
    >
      <div className="container-wide">
        <div className={styles.header}>
          <div>
            <span className="text-subheading">LATEST FROM THE GALLERY</span>
            <h2 className="heading-lg" style={{ marginTop: "0.5rem" }}>
              NEWS & UPDATES
            </h2>
          </div>
          <Link href="/news" className={styles.viewAll}>
            VIEW ALL →
          </Link>
        </div>

        <NewsGrid newsList={newsItems} />
      </div>
    </section>
  );
}
