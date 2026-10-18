import React from "react";
import Link from "next/link";
import NewsGrid from "@/components/news/NewsGrid";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import { getAllNews } from "@/lib/newsHelpers";
import styles from "./news.module.css";

export const metadata = {
  title: "News & Updates | Dawson Wells Gallery",
  description: "Stay updated with our latest exhibitions, events, art fair participations, and gallery news.",
};

export default function NewsPage() {
  const newsList = getAllNews();

  return (
    <div className={styles.pageRoot}>

      {/* ── Back Navigation ── */}
      <div className={styles.backBar}>
        <div className="container-wide">
          <Link href="/" className={styles.backLink}>
            <ArrowLeftIcon size={14} />
            <span>BACK TO HOME</span>
          </Link>
        </div>
      </div>

      {/* ── Cinematic Hero Banner ── */}
      <div className={styles.heroBanner}>
        <img
          src="/images/gallery/corridor.jpg"
          alt="Dawson Wells Gallery News"
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay} />
        <div className={`container-wide ${styles.heroContent}`}>
          <span className={styles.heroEyebrow}>DAWSON WELLS GALLERY</span>
          <h1 className={styles.heroTitle}>NEWS &amp;<br />UPDATES</h1>
        </div>
      </div>

      {/* ── News Content ── */}
      <div className={styles.contentSection}>
        <div className="container-wide">
          <NewsGrid newsList={newsList} />
        </div>
      </div>

    </div>
  );
}
