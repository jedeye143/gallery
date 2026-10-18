"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./DesktopNavigation.module.css";

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "ARTWORKS", href: "/artworks" },
  { label: "NEWS & UPDATES", href: "/news" },
  { label: "CONTACT", href: "/contact" },
];

export default function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Main Navigation">
      <ul className={styles.navList}>
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
