"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CloseIcon } from "../ui/Icons";
import styles from "./Sidebar.module.css";

const NAV_ITEMS = [
  { label: "HOME", href: "/", number: "01" },
  { label: "ABOUT", href: "/about", number: "02" },
  { label: "ARTWORKS", href: "/artworks", number: "03" },
  { label: "NEWS & UPDATES", href: "/news", number: "04" },
  { label: "CONTACT", href: "/contact", number: "05" },
];

function ChevronIcon({ direction = "left" }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: direction === "right" ? "rotate(180deg)" : "none", transition: "transform 0.35s ease" }}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export default function Sidebar({ isCollapsed, onToggle, isMobileOpen, onMobileClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
        aria-label="Gallery Navigation"
      >
        {/* Logo Block */}
        <div className={styles.logoBlock}>
          <Link href="/" className={styles.logoLink} aria-label="Dawson Wells Gallery Home">
            <div className={styles.logoSeal}>
              <span>DW</span>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>DAWSON</span>
              <span className={styles.logoName}>WELLS</span>
              <span className={styles.logoSub}>GALLERY</span>
            </div>
          </Link>
        </div>

        <div className={styles.goldDivider} />

        {/* Main Navigation */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navItem} ${isActive ? styles.navActive : ""}`}
                    title={item.label}
                  >
                    {isActive && <div className={styles.leftGoldBar} />}
                    <span className={styles.navNumber}>{item.number}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Area */}
        <div className={styles.sidebarBottom}>
          <div className={styles.goldDivider} />
          
          {/* Socials */}
          <div className={styles.socials}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              title="Instagram"
            >
              <span className={styles.socialTag}>IG</span>
              <span className={styles.navLabel}>INSTAGRAM</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              title="Facebook"
            >
              <span className={styles.socialTag}>FB</span>
              <span className={styles.navLabel}>FACEBOOK</span>
            </a>
          </div>

          <div className={styles.goldDivider} />

          {/* Collapse Toggle */}
          <button
            onClick={onToggle}
            className={styles.collapseBtn}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronIcon direction={isCollapsed ? "right" : "left"} />
            <span className={styles.navLabel}>{isCollapsed ? "EXPAND" : "COLLAPSE"}</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className={styles.mobileOverlay} onClick={onMobileClose}>
          <div className={styles.mobilePanel} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mobilePanelHeader}>
              <Link href="/" className={styles.logoLink} onClick={onMobileClose}>
                <div className={styles.logoSeal}>
                  <span>DW</span>
                </div>
                <div className={styles.logoText}>
                  <span className={styles.logoName}>DAWSON</span>
                  <span className={styles.logoName}>WELLS</span>
                  <span className={styles.logoSub}>GALLERY</span>
                </div>
              </Link>
              <button className={styles.mobileClose} onClick={onMobileClose} aria-label="Close menu">
                <CloseIcon size={22} />
              </button>
            </div>

            <div className={styles.goldDivider} />

            <nav style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <ul className={styles.mobileNavList}>
                {NAV_ITEMS.map((item, i) => {
                  const isActive =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <li
                      key={item.href}
                      className={styles.mobileNavItem}
                      style={{ animationDelay: `${0.08 * i}s` }}
                    >
                      <Link
                        href={item.href}
                        onClick={onMobileClose}
                        className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavActive : ""}`}
                      >
                        <span className={styles.mobileNavNumber}>{item.number}</span>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className={styles.goldDivider} />
            <p className={styles.mobileFooterText}>123 ART DISTRICT &bull; MAKATI CITY</p>
          </div>
        </div>
      )}
    </>
  );
}
