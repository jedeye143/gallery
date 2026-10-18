"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DesktopNavigation from "./DesktopNavigation";
import MobileMenu from "./MobileMenu";
import { MenuIcon, GridIcon } from "../ui/Icons";
import styles from "./Header.module.css";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container-wide ${styles.headerContainer}`}>
          {/* Gallery Branding Logo */}
          <Link href="/" className={styles.logoLink} aria-label="Dawson Wells Gallery Home">
            <div className={styles.logo}>
              <span className={styles.logoTitle}>DAWSON</span>
              <span className={styles.logoTitle}>WELLS</span>
              <span className={styles.logoSub}>GALLERY</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className={styles.desktopNavWrapper}>
            <DesktopNavigation />
          </div>

          {/* Right Icon / Mobile Toggle */}
          <div className={styles.actions}>
            <Link href="/artworks" className={styles.gridIconLink} aria-label="View Artwork Grid">
              <GridIcon size={20} />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className={styles.mobileMenuBtn}
              aria-label="Open Mobile Menu"
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
