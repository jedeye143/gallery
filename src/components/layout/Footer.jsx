"use client";

import React, { useState } from "react";
import Link from "next/link";
import BackToTop from "../ui/BackToTop";
import { GALLERY_INFO } from "@/data/gallery";
import { ArrowRightIcon, LocationIcon, MailIcon } from "../ui/Icons";
import styles from "./Footer.module.css";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className={styles.footerRoot}>
      {/* Gold Top Accent Rule */}
      <div className={styles.goldTopBorder} />

      <div className={`container-wide ${styles.footerContainer}`}>

        {/* ── 3-COLUMN MAIN FOOTER GRID ── */}
        <div className={styles.mainGrid}>

          {/* Col 1: Brand Dossier & Emblem */}
          <div className={styles.brandCol}>
            <div className={styles.brandEmblemRow}>
              <div className={styles.brandSeal}>DWG</div>
              <span className={styles.brandName}>{GALLERY_INFO.name}</span>
            </div>
            
            <p className={styles.brandTagline}>{GALLERY_INFO.tagline}</p>
            <p className={styles.brandSlogan}>{GALLERY_INFO.slogan}</p>

            <div className={styles.locationBadge}>
              <LocationIcon size={14} className={styles.badgeIcon} />
              <span>{GALLERY_INFO.address} &bull; {GALLERY_INFO.city}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className={styles.navCol}>
            <span className={styles.colHeader}>NAVIGATION</span>
            <ul className={styles.navList}>
              <li>
                <Link href="/" className={styles.navLink}>
                  <span>HOME</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.navLink}>
                  <span>ABOUT THE GALLERY</span>
                </Link>
              </li>
              <li>
                <Link href="/artworks" className={styles.navLink}>
                  <span>ARTWORKS COLLECTION</span>
                </Link>
              </li>
              <li>
                <Link href="/news" className={styles.navLink}>
                  <span>EXHIBITIONS &amp; NEWS</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.navLink}>
                  <span>CONTACT &amp; ADVISORY</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Newsletter & Collector Journal */}
          <div className={styles.newsletterCol}>
            <span className={styles.colHeader}>COLLECTOR DISPATCH</span>
            <p className={styles.newsletterText}>
              Subscribe to receive private exhibition invitations, curatorial essays, and edition release dispatches.
            </p>

            {subscribed ? (
              <div className={styles.subscribeSuccess}>
                <span className={styles.successCheck}>✓</span>
                <p>Thank you. Your address has been added to our private collector list.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                <div className={styles.inputWrapper}>
                  <MailIcon size={14} className={styles.inputIcon} />
                  <input
                    type="email"
                    required
                    placeholder="Enter email for private dispatches..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className={styles.newsletterInput}
                  />
                  <button type="submit" className={styles.subscribeBtn}>
                    <span>JOIN</span>
                    <ArrowRightIcon size={12} />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Gold Mid Divider */}
        <div className={styles.goldDivider} />

        {/* ── BOTTOM BAR: Copyright, Socials, Back to Top ── */}
        <div className={styles.bottomRow}>
          <div className={styles.copyrightBlock}>
            <span className={styles.copyrightText}>
              &copy; {new Date().getFullYear()} Dawson Wells Gallery. All Rights Reserved.
            </span>
            <span className={styles.privacyLink}>PRIVACY POLICY &bull; TERMS OF ACQUISITION</span>
          </div>

          <div className={styles.socialLinksRow}>
            <a
              href={GALLERY_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              INSTAGRAM
            </a>
            <a
              href={GALLERY_INFO.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              FACEBOOK
            </a>
            <a
              href={GALLERY_INFO.socials.artsy}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              ARTSY
            </a>
          </div>

          <div className={styles.backToTopBlock}>
            <BackToTop />
          </div>
        </div>

      </div>
    </footer>
  );
}
