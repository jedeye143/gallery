"use client";

import React from "react";
import { ARTWORK_CATEGORIES } from "@/data/artworks";
import styles from "./ArtworkFilter.module.css";

export default function ArtworkFilter({
  activeCategory,
  onSelectCategory,
  categoryCounts,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className={styles.filterSection}>
      {/* Top Bar: Search Input & Controls */}
      <div className={styles.topControlRow}>
        {/* Search Box */}
        <div className={styles.searchBox}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search artwork, artist, or medium..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button onClick={() => onSearchChange("")} className={styles.clearSearchBtn}>
              ✕
            </button>
          )}
        </div>

        <div className={styles.controlsRight}>
          {/* Sort Selector */}
          <div className={styles.sortWrapper}>
            <span className="caption" style={{ fontSize: "0.68rem" }}>SORT:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="NEWEST">Newest Additions</option>
              <option value="OLDEST">Year: Oldest to Newest</option>
              <option value="TITLE_ASC">Title: A to Z</option>
            </select>
          </div>

          {/* 2 View Mode Switches: Museum Hall & Masonry */}
          <div className={styles.viewModeToggle} role="group" aria-label="Layout View Modes">
            <button
              onClick={() => onViewModeChange("hall")}
              className={`${styles.viewBtn} ${viewMode === "hall" ? styles.viewActive : ""}`}
              title="Museum Wall Exhibit View"
            >
              <span className={styles.viewIconText}>🏛️ MUSEUM HALL</span>
            </button>
            <button
              onClick={() => onViewModeChange("masonry")}
              className={`${styles.viewBtn} ${viewMode === "masonry" ? styles.viewActive : ""}`}
              title="Masonry Wall Layout"
            >
              <span className={styles.viewIconText}>❖ MASONRY</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Track with Badges */}
      <div className={styles.categoryTrack} role="tablist" aria-label="Artwork Categories">
        {ARTWORK_CATEGORIES.map((cat) => {
          const isActive = activeCategory.toUpperCase() === cat.toUpperCase();
          const count = categoryCounts[cat] || 0;

          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(cat)}
              className={`${styles.categoryTab} ${isActive ? styles.tabActive : ""}`}
            >
              <span>{cat}</span>
              <span className={styles.countBadge}>({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
