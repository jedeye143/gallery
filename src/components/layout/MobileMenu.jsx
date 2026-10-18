"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CloseIcon } from "../ui/Icons";
import styles from "./MobileMenu.module.css";

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "ARTWORKS", href: "/artworks" },
  { label: "NEWS & UPDATES", href: "/news" },
  { label: "CONTACT", href: "/contact" },
];

export default function MobileMenu({ isOpen, onClose }) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <span>DAWSON</span>
          <span>WELLS</span>
          <span className={styles.sub}>GALLERY</span>
        </div>

        <button
          onClick={onClose}
          className={styles.closeBtn}
          aria-label="Close Mobile Navigation"
        >
          <CloseIcon size={24} />
        </button>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {NAV_ITEMS.map((item, index) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <li
                key={item.href}
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                className={styles.navItem}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.footer}>
        <span className="caption">123 ART DISTRICT, MAKATI CITY</span>
        <a href="mailto:info@dawsonwellsgallery.com" className="caption">
          INFO@DAWSONWELLSGALLERY.COM
        </a>
      </div>
    </div>
  );
}
