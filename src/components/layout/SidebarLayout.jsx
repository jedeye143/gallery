"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "../layout/Sidebar";
import styles from "./SidebarLayout.module.css";

// Mobile topbar (hamburger) — shown only on mobile
function MobileTopbar({ onOpen }) {
  return (
    <div className={styles.mobileTopbar}>
      <Link href="/" className={styles.mobileTopbarLogo}>
        DAWSON WELLS <span>GALLERY</span>
      </Link>
      <button
        onClick={onOpen}
        className={styles.mobileHamburger}
        aria-label="Open navigation menu"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="16" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </svg>
        <span>MENU</span>
      </button>
    </div>
  );
}

export default function SidebarLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sidebarWidth = isCollapsed ? 72 : 260;

  return (
    <div className={styles.root}>
      {/* Mobile topbar */}
      <MobileTopbar onOpen={() => setIsMobileOpen(true)} />

      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed((prev) => !prev)}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />

      {/* Main content area — pushes right of sidebar */}
      <main
        className={styles.mainContent}
        style={{ marginLeft: sidebarWidth }}
      >
        {children}
      </main>
    </div>
  );
}
