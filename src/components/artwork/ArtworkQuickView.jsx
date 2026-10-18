"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CloseIcon, ArrowLeftIcon, ArrowRightIcon, ShareIcon } from "../ui/Icons";
import Button from "../ui/Button";
import InquireModal from "../ui/InquireModal";
import styles from "./ArtworkQuickView.module.css";

export default function ArtworkQuickView({ artwork, isOpen, onClose }) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [inquireOpen, setInquireOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && artwork?.images?.length > 1) {
        setActiveImgIdx((prev) => (prev - 1 + artwork.images.length) % artwork.images.length);
      }
      if (e.key === "ArrowRight" && artwork?.images?.length > 1) {
        setActiveImgIdx((prev) => (prev + 1) % artwork.images.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, artwork, onClose]);

  const [prevArtwork, setPrevArtwork] = useState(artwork);
  if (artwork !== prevArtwork) {
    setPrevArtwork(artwork);
    setActiveImgIdx(0);
  }

  if (!isOpen || !artwork) return null;

  const currentImage = artwork.images[activeImgIdx] || artwork.images[0];

  const handleShare = async () => {
    const url = `${window.location.origin}/artworks/${artwork.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: artwork.title,
          text: `${artwork.title} by ${artwork.artist}`,
          url,
        });
      } catch (err) {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
        <div className={styles.museumModal} onClick={(e) => e.stopPropagation()}>
          {/* Header Control Bar */}
          <div className={styles.topControlBar}>
            <div className={styles.galleryBadge}>
              <span className={styles.goldIndicator} />
              <span>DAWSON WELLS GALLERY — EXHIBITION CATALOGUE</span>
            </div>

            <button className={styles.closeBtn} onClick={onClose} aria-label="Close Lightbox">
              <span>CLOSE</span>
              <CloseIcon size={18} />
            </button>
          </div>

          {/* Main Exhibition Layout */}
          <div className={styles.exhibitionGrid}>
            {/* Left: Gallery Wall Presentation */}
            <div className={styles.wallStage}>
              <div className={styles.canvasFrame}>
                <Image
                  src={currentImage}
                  alt={`${artwork.title} by ${artwork.artist}`}
                  fill
                  priority
                  style={{ objectFit: "contain" }}
                  className={styles.canvasImage}
                />

                {artwork.images.length > 1 && (
                  <>
                    <button
                      className={`${styles.navBtn} ${styles.prevBtn}`}
                      onClick={() =>
                        setActiveImgIdx((prev) => (prev - 1 + artwork.images.length) % artwork.images.length)
                      }
                      aria-label="Previous view"
                    >
                      <ArrowLeftIcon size={16} />
                    </button>
                    <button
                      className={`${styles.navBtn} ${styles.nextBtn}`}
                      onClick={() => setActiveImgIdx((prev) => (prev + 1) % artwork.images.length)}
                      aria-label="Next view"
                    >
                      <ArrowRightIcon size={16} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {artwork.images.length > 1 && (
                <div className={styles.thumbRow}>
                  {artwork.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImgIdx(i)}
                      className={`${styles.thumb} ${i === activeImgIdx ? styles.thumbActive : ""}`}
                    >
                      <Image src={img} alt="Detail" width={60} height={60} style={{ objectFit: "cover" }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Museum Wall Plaque & Details */}
            <div className={styles.plaquePanel}>
              <div className={styles.artistHeader}>
                <span className={styles.artistLabel}>{artwork.artist}</span>
                <span className={styles.categoryTag}>{artwork.category}</span>
              </div>

              <h2 className={styles.title}>{artwork.title}</h2>

              <p className={styles.subtitle}>
                {artwork.medium}, {artwork.year}
              </p>

              <p className={styles.dimensions}>{artwork.dimensions}</p>

              <hr className={styles.divider} />

              <p className={styles.description}>{artwork.description}</p>

              {/* Spec Table */}
              <div className={styles.specsTable}>
                <div className={styles.specRow}>
                  <span className={styles.specKey}>CATEGORY</span>
                  <span className={styles.specValue}>{artwork.category}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specKey}>MEDIUM</span>
                  <span className={styles.specValue}>{artwork.medium}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specKey}>YEAR</span>
                  <span className={styles.specValue}>{artwork.year}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specKey}>DIMENSIONS</span>
                  <span className={styles.specValue}>{artwork.dimensions}</span>
                </div>
                {artwork.edition && (
                  <div className={styles.specRow}>
                    <span className={styles.specKey}>EDITION</span>
                    <span className={styles.specValue}>{artwork.edition}</span>
                  </div>
                )}
                <div className={styles.specRow}>
                  <span className={styles.specKey}>AVAILABILITY</span>
                  <span className={styles.availabilityValue}>{artwork.availability}</span>
                </div>
              </div>

              {/* Actions */}
              <div className={styles.actionSection}>
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => setInquireOpen(true)}
                  style={{ width: "100%" }}
                >
                  INQUIRE ABOUT THIS ARTWORK
                </Button>

                <div className={styles.actionLinks}>
                  <Link
                    href={`/artworks/${artwork.slug}`}
                    onClick={onClose}
                    className={styles.fullPageLink}
                  >
                    VIEW FULL CATALOGUE PAGE →
                  </Link>

                  <button onClick={handleShare} className={styles.shareBtn}>
                    <ShareIcon size={14} />
                    <span>{copied ? "COPIED" : "SHARE"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InquireModal
        isOpen={inquireOpen}
        onClose={() => setInquireOpen(false)}
        artwork={artwork}
      />
    </>
  );
}
