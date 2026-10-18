"use client";

import React, { useState } from "react";
import styles from "./ArtworkGallery.module.css";
import { GridIcon } from "../ui/Icons";

export default function ArtworkGallery({ images = [], title = "" }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState("wall"); // 'wall' | 'clean'
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const currentImage = images[activeImageIndex] || images[0];

  return (
    <div className={styles.galleryContainer}>
      {/* View Mode Toggle Controls */}
      <div className={styles.galleryHeaderControls}>
        <div className={styles.modeToggleGroup}>
          <button
            onClick={() => setViewMode("wall")}
            className={`${styles.modeBtn} ${viewMode === "wall" ? styles.modeBtnActive : ""}`}
            title="Museum Spotlight Wall View"
          >
            MUSEUM WALL STAGE
          </button>
          <button
            onClick={() => setViewMode("clean")}
            className={`${styles.modeBtn} ${viewMode === "clean" ? styles.modeBtnActive : ""}`}
            title="Clean Image Focus"
          >
            FULL FOCUS
          </button>
        </div>

        <button
          onClick={() => setLightboxOpen(true)}
          className={styles.fullscreenBtn}
          title="Inspect High-Res Artwork"
        >
          <GridIcon size={14} />
          <span>INSPECT CLOSE-UP</span>
        </button>
      </div>

      {/* Main Artwork Stage */}
      <div
        className={`${styles.stage} ${viewMode === "wall" ? styles.wallStage : styles.cleanStage}`}
        onClick={() => setLightboxOpen(true)}
      >
        {/* Spotlight Beam Light */}
        {viewMode === "wall" && <div className={styles.spotlightBeam} />}

        <div className={styles.frameWrapper}>
          <img
            src={currentImage}
            alt={`${title} - View ${activeImageIndex + 1}`}
            className={styles.mainArtworkImg}
          />
          {/* Subtle Frame Glare / Reflection */}
          <div className={styles.glassReflection} />
        </div>

        {/* Museum Spotlight Wall Caption Tag */}
        {viewMode === "wall" && (
          <div className={styles.wallPlaqueTag}>
            <span>DAWSON WELLS GALLERY EXHIBITION</span>
          </div>
        )}
      </div>

      {/* Thumbnails Gallery Strip (if multi-image) */}
      {images.length > 1 && (
        <div className={styles.thumbnailStrip}>
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`${styles.thumbBtn} ${idx === activeImageIndex ? styles.thumbActive : ""}`}
            >
              <img src={img} alt={`View ${idx + 1}`} className={styles.thumbImg} />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Fullscreen Inspection Modal */}
      {lightboxOpen && (
        <div className={styles.lightboxOverlay} onClick={() => setLightboxOpen(false)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeLightboxBtn} onClick={() => setLightboxOpen(false)}>
              ✕ CLOSE INSPECTION
            </button>
            <img src={currentImage} alt={title} className={styles.lightboxImg} />
            <div className={styles.lightboxCaption}>
              <span className={styles.lightboxTitle}>{title}</span>
              <span className={styles.lightboxHint}>CLICK ANYWHERE TO CLOSE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
