"use client";

import React, { useState } from "react";
import ArtworkCard from "./ArtworkCard";
import ArtworkQuickView from "./ArtworkQuickView";
import Button from "../ui/Button";
import styles from "./ArtworkGrid.module.css";

const MASONRY_PATTERN = ["tall", "normal", "normal", "wide", "normal", "normal", "tall", "normal"];

export default function ArtworkGrid({ artworks, viewMode = "hall" }) {
  const [visibleCount, setVisibleCount] = useState(9);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  if (!artworks || artworks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3 className="heading-md">No Artworks Found</h3>
        <p className="body-main" style={{ marginTop: "0.5rem" }}>
          No artworks match your selected category or search query.
        </p>
      </div>
    );
  }

  const visible = artworks.slice(0, visibleCount);
  const hasMore = visibleCount < artworks.length;

  const gridClassName = viewMode === "masonry" ? styles.masonryGrid : styles.museumHallGrid;

  return (
    <div>
      <div className={gridClassName}>
        {visible.map((artwork, idx) => {
          const size = viewMode === "masonry" ? MASONRY_PATTERN[idx % MASONRY_PATTERN.length] : "normal";
          return (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              size={size}
              displayStyle={viewMode === "hall" ? "museum" : "standard"}
              onQuickView={(art) => setSelectedArtwork(art)}
            />
          );
        })}
      </div>

      {hasMore && (
        <div className={styles.loadMoreWrapper}>
          <Button
            variant="outline"
            size="medium"
            onClick={() => setVisibleCount((prev) => prev + 6)}
          >
            LOAD MORE ARTWORKS ({artworks.length - visibleCount} REMAINING)
          </Button>
        </div>
      )}

      {/* Quick View Museum Lightbox Modal */}
      <ArtworkQuickView
        artwork={selectedArtwork}
        isOpen={Boolean(selectedArtwork)}
        onClose={() => setSelectedArtwork(null)}
      />
    </div>
  );
}
