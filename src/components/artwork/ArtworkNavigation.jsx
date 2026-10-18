import React from "react";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "../ui/Icons";
import styles from "./ArtworkNavigation.module.css";

export default function ArtworkNavigation({ prev, next }) {
  return (
    <nav className={styles.navContainer} aria-label="Artwork Pagination">
      {prev ? (
        <Link href={`/artworks/${prev.slug}`} className={styles.navItem}>
          <div className={styles.thumbWrapper}>
            <img src={prev.images[0]} alt={prev.title} className={styles.navThumb} />
          </div>
          <div className={styles.navMeta}>
            <span className={styles.navDirection}>
              <ArrowLeftIcon size={12} /> PREVIOUS ARTWORK
            </span>
            <span className={styles.navTitle}>{prev.title}</span>
            <span className={styles.navArtist}>{prev.artist}</span>
          </div>
        </Link>
      ) : <div />}

      {next ? (
        <Link href={`/artworks/${next.slug}`} className={`${styles.navItem} ${styles.navRight}`}>
          <div className={`${styles.navMeta} ${styles.textRight}`}>
            <span className={styles.navDirection}>
              NEXT ARTWORK <ArrowRightIcon size={12} />
            </span>
            <span className={styles.navTitle}>{next.title}</span>
            <span className={styles.navArtist}>{next.artist}</span>
          </div>
          <div className={styles.thumbWrapper}>
            <img src={next.images[0]} alt={next.title} className={styles.navThumb} />
          </div>
        </Link>
      ) : <div />}
    </nav>
  );
}
