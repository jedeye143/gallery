"use client";

import React, { useState } from "react";
import Button from "../ui/Button";
import InquireModal from "../ui/InquireModal";
import { ShareIcon, ArrowRightIcon } from "../ui/Icons";
import styles from "./ArtworkInfo.module.css";

export default function ArtworkInfo({ artwork }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'provenance' | 'specs'

  if (!artwork) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: artwork.title,
          text: `${artwork.title} by ${artwork.artist} at Dawson Wells Gallery`,
          url: window.location.href,
        });
      } catch (err) {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      <div className={styles.infoProspectus}>
        {/* Top Provenance Catalogue Reference Header */}
        <div className={styles.catalogueHeader}>
          <span className={styles.catalogueRef}>
            CATALOGUE NO. DW-2024-{artwork.id.padStart(3, "0")}
          </span>
          <span className={styles.availabilityBadge}>
            {artwork.availability === "Sold" ? "ACQUIRED / PRIVATE COLLECTION" : "AVAILABLE FOR PRIVATE ACQUISITION"}
          </span>
        </div>

        {/* Artist Header */}
        <div className={styles.artistSection}>
          <span className={styles.artistName}>{artwork.artist}</span>
          <h1 className={styles.artworkTitle}>{artwork.title}</h1>
          <p className={styles.artworkSubtitle}>
            {artwork.medium} &bull; {artwork.year}
          </p>
        </div>

        {/* Prospectus Tab Switcher */}
        <div className={styles.tabBar}>
          <button
            onClick={() => setActiveTab("overview")}
            className={`${styles.tabBtn} ${activeTab === "overview" ? styles.tabActive : ""}`}
          >
            OVERVIEW
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`${styles.tabBtn} ${activeTab === "specs" ? styles.tabActive : ""}`}
          >
            SPECIFICATIONS
          </button>
          <button
            onClick={() => setActiveTab("provenance")}
            className={`${styles.tabBtn} ${activeTab === "provenance" ? styles.tabActive : ""}`}
          >
            PROVENANCE &amp; CERTIFICATE
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className={styles.tabContent}>
            <blockquote className={styles.curatorialQuote}>
              &ldquo;{artwork.description}&rdquo;
            </blockquote>

            <div className={styles.quickSpecsGrid}>
              <div className={styles.quickSpecBox}>
                <span className={styles.quickLabel}>DIMENSIONS</span>
                <span className={styles.quickValue}>{artwork.dimensions}</span>
              </div>
              <div className={styles.quickSpecBox}>
                <span className={styles.quickLabel}>EDITION / STATUS</span>
                <span className={styles.quickValue}>{artwork.edition || "Original Artwork"}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Specifications */}
        {activeTab === "specs" && (
          <div className={styles.tabContent}>
            <div className={styles.specsTable}>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>ARTIST</span>
                <span className={styles.specValue}>{artwork.artist}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>CATEGORY</span>
                <span className={styles.specValue}>{artwork.category}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>MEDIUM</span>
                <span className={styles.specValue}>{artwork.medium}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>CREATION YEAR</span>
                <span className={styles.specValue}>{artwork.year}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>DIMENSIONS</span>
                <span className={styles.specValue}>{artwork.dimensions}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>EDITION</span>
                <span className={styles.specValue}>{artwork.edition || "1 of 1 (Original Unique)"}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>FRAMING</span>
                <span className={styles.specValue}>Custom Museum Hardwood Framing Included</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Provenance & Certificate */}
        {activeTab === "provenance" && (
          <div className={styles.tabContent}>
            <div className={styles.certificateCard}>
              <div className={styles.certSeal}>
                <span>DWG</span>
              </div>
              <h4 className={styles.certTitle}>CERTIFICATE OF AUTHENTICITY</h4>
              <p className={styles.certBody}>
                This artwork is accompanied by a signed Certificate of Authenticity issued directly by Dawson Wells Gallery and verified by the artist’s studio.
              </p>
              <ul className={styles.certList}>
                <li>Direct provenance from artist&apos;s studio archive</li>
                <li>Museum-grade conservation packaging & climate crate</li>
                <li>Complimentary insured global white-glove transport</li>
              </ul>
            </div>
          </div>
        )}

        {/* CTA Block */}
        <div className={styles.ctaBlock}>
          <button
            onClick={() => setModalOpen(true)}
            className={styles.primaryInquireBtn}
          >
            <span>INQUIRE ABOUT THIS ARTWORK</span>
            <ArrowRightIcon size={16} />
          </button>

          <div className={styles.secondaryActions}>
            <button onClick={() => setModalOpen(true)} className={styles.actionBtn}>
              REQUEST CONDITION REPORT
            </button>
            <button onClick={handleShare} className={styles.actionBtn}>
              <ShareIcon size={13} />
              <span>{copied ? "LINK COPIED TO CLIPBOARD" : "SHARE PROSPECTUS"}</span>
            </button>
          </div>
        </div>
      </div>

      <InquireModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        artwork={artwork}
      />
    </>
  );
}
