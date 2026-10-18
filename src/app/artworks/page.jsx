"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import ArtworkFilter from "@/components/artwork/ArtworkFilter";
import ArtworkGrid from "@/components/artwork/ArtworkGrid";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import { ARTWORKS_DATA, ARTWORK_CATEGORIES } from "@/data/artworks";
import styles from "./artworks.module.css";

export default function ArtworksPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("hall");
  const [sortBy, setSortBy] = useState("NEWEST");

  // Calculate dynamic category counts
  const categoryCounts = useMemo(() => {
    const counts = { ALL: ARTWORKS_DATA.length };
    ARTWORK_CATEGORIES.forEach((cat) => {
      if (cat !== "ALL") {
        counts[cat] = ARTWORKS_DATA.filter(
          (item) => item.category.toUpperCase() === cat.toUpperCase()
        ).length;
      }
    });
    return counts;
  }, []);

  // Filter & Sort Artworks
  const filteredArtworks = useMemo(() => {
    let result = [...ARTWORKS_DATA];

    if (activeCategory.toUpperCase() !== "ALL") {
      result = result.filter(
        (item) => item.category.toUpperCase() === activeCategory.toUpperCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.artist.toLowerCase().includes(q) ||
          item.medium.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === "OLDEST") {
      result.sort((a, b) => a.year - b.year);
    } else if (sortBy === "NEWEST") {
      result.sort((a, b) => b.year - a.year);
    } else if (sortBy === "TITLE_ASC") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

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
          src="/images/gallery/hero-slide-2.jpg"
          alt="Dawson Wells Gallery Collection"
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay} />
        <div className={`container-wide ${styles.heroContent}`}>
          <span className={styles.heroEyebrow}>DAWSON WELLS COLLECTION</span>
          <h1 className={styles.heroTitle}>THE<br />COLLECTION</h1>
        </div>
      </div>

      {/* ── Filter & Grid ── */}
      <div className={styles.collectionSection}>
        <div className="container-wide">

          {/* Category & Control Filter Bar */}
          <ArtworkFilter
            activeCategory={activeCategory}
            onSelectCategory={(cat) => setActiveCategory(cat)}
            categoryCounts={categoryCounts}
            searchQuery={searchQuery}
            onSearchChange={(q) => setSearchQuery(q)}
            viewMode={viewMode}
            onViewModeChange={(m) => setViewMode(m)}
            sortBy={sortBy}
            onSortChange={(s) => setSortBy(s)}
          />

          {/* Results Counter */}
          <div className={styles.resultsBar}>
            <span className={styles.resultsCount}>
              SHOWING {filteredArtworks.length}{" "}
              {filteredArtworks.length === 1 ? "ARTWORK" : "ARTWORKS"}
              {activeCategory !== "ALL" ? ` IN ${activeCategory}` : ""}
            </span>
          </div>

          {/* Collection Grid */}
          <ArtworkGrid artworks={filteredArtworks} viewMode={viewMode} />
        </div>
      </div>

    </div>
  );
}
