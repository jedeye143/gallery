"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import InquireModal from "../ui/InquireModal";
import styles from "./ArtworkCard.module.css";

export default function ArtworkCard({ artwork, displayStyle = "museum", onQuickView }) {
  const [inquireOpen, setInquireOpen] = useState(false);

  if (!artwork) return null;

  return (
    <>
      <article className={styles.wallMount}>
        {/* Overhead Gallery Spotlight Glow */}
        <div className={styles.spotlight} />

        {/* Exciting Museum Gallery Frame with Glass Reflection & Bevel */}
        <div className={styles.museumFrame}>
          <div className={styles.frameMolding}>
            <div className={styles.glassReflection} />
            <div className={styles.canvasContainer}>
              <Image
                src={artwork.images[0]}
                alt={`${artwork.title} by ${artwork.artist}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "contain" }}
                className={styles.paintingCanvas}
              />
            </div>
          </div>

          {/* Floating Hover Action Triggers */}
          <div className={styles.hoverActions}>
            {onQuickView && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onQuickView(artwork);
                }}
                className={styles.actionBtn}
                title="Quick View Lightbox"
              >
                <span>QUICK VIEW</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M14 10l6-6M9 21H3v-6M10 14l-6 6" />
                </svg>
              </button>
            )}

            <Link
              href={`/artworks/${artwork.slug}`}
              className={styles.actionBtn}
              title="Full Catalogue Page"
            >
              <span>CATALOGUE</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* 100% UNIFORM Museum Wall Plaque */}
        <div className={styles.wallPlaque}>
          <div className={styles.plaqueHeader}>
            <span className={styles.plaqueArtist}>{artwork.artist}</span>
            <span className={styles.plaqueCategory}>{artwork.category}</span>
          </div>

          {/* Title with Ellipsis (...) & Hover Reveal */}
          <h3 className={styles.plaqueTitle} title={artwork.title}>
            <Link href={`/artworks/${artwork.slug}`}>{artwork.title}</Link>
          </h3>

          {/* Medium & Year with Ellipsis (...) & Hover Reveal */}
          <p className={styles.plaqueMediumYear} title={`${artwork.medium}, ${artwork.year}`}>
            {artwork.medium}, {artwork.year}
          </p>

          {/* Uniform Footer: Dimensions & INQUIRE CTA Button */}
          <div className={styles.plaqueFooter}>
            <span className={styles.plaqueDimensions}>{artwork.dimensions}</span>

            <button
              onClick={() => setInquireOpen(true)}
              className={styles.inquireBtn}
              title={`Inquire about ${artwork.title}`}
            >
              INQUIRE
            </button>
          </div>
        </div>
      </article>

      {/* Inquiry Modal */}
      <InquireModal
        isOpen={inquireOpen}
        onClose={() => setInquireOpen(false)}
        artwork={artwork}
      />
    </>
  );
}
