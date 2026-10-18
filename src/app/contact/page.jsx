"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LocationIcon, MailIcon, PhoneIcon, ClockIcon, ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";
import { GALLERY_INFO } from "@/data/gallery";
import styles from "./contact.module.css";

const INQUIRY_TYPES = [
  "Artwork Acquisition",
  "Exhibition Inquiry",
  "Artist Representation",
  "Corporate Collection",
  "Press & Media",
  "General Inquiry",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [activeType, setActiveType] = useState("General Inquiry");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.pageRoot}>
      {/* ══ FULL-PAGE SPLIT LAYOUT ══ */}
      <div className={styles.splitRoot}>

        {/* ── LEFT PANEL: Architectural Fine Art Dossier ── */}
        <div className={styles.leftPanel}>
          {/* Top Sticky Back Nav */}
          <div className={styles.panelTopBar}>
            <Link href="/" className={styles.backLink}>
              <ArrowLeftIcon size={13} />
              <span>BACK TO HOME</span>
            </Link>
          </div>

          <div className={styles.panelScrollBody}>
            {/* Header Title Block */}
            <div className={styles.titleBlock}>
              <span className={styles.panelEyebrow}>
                ESTABLISHED {GALLERY_INFO.established} &bull; DAWSON WELLS GALLERY
              </span>
              <h1 className={styles.panelTitle}>GET IN TOUCH</h1>
              <p className={styles.panelSubtitle}>
                We invite collectors, artists, and institutions to visit our gallery spaces or reach out directly to our curatorial specialists.
              </p>
            </div>

            {/* Gallery Architecture Showcase Card */}
            <div className={styles.showcaseCard}>
              <div className={styles.showcaseFrame}>
                <img
                  src="/images/gallery/corridor.jpg"
                  alt="Dawson Wells Gallery Main Exhibition Space"
                  className={styles.showcaseImg}
                />
                <div className={styles.showcaseGlare} />
              </div>
              <div className={styles.showcaseCaption}>
                <span>MAIN EXHIBITION SPACE &bull; MAKATI ART DISTRICT</span>
              </div>
            </div>

            {/* 2x2 Contact Information Matrix */}
            <div className={styles.contactGrid}>
              <div className={styles.matrixCard}>
                <div className={styles.cardHeader}>
                  <LocationIcon size={16} className={styles.cardIcon} />
                  <span className={styles.cardLabel}>LOCATION</span>
                </div>
                <p className={styles.cardText}>{GALLERY_INFO.address}</p>
                <p className={styles.cardTextHighlight}>{GALLERY_INFO.city}</p>
              </div>

              <div className={styles.matrixCard}>
                <div className={styles.cardHeader}>
                  <ClockIcon size={16} className={styles.cardIcon} />
                  <span className={styles.cardLabel}>GALLERY HOURS</span>
                </div>
                <p className={styles.cardText}>{GALLERY_INFO.hours}</p>
              </div>

              <div className={styles.matrixCard}>
                <div className={styles.cardHeader}>
                  <MailIcon size={16} className={styles.cardIcon} />
                  <span className={styles.cardLabel}>EMAIL INQUIRIES</span>
                </div>
                <a href={`mailto:${GALLERY_INFO.email}`} className={styles.cardLink}>
                  {GALLERY_INFO.email}
                </a>
              </div>

              <div className={styles.matrixCard}>
                <div className={styles.cardHeader}>
                  <PhoneIcon size={16} className={styles.cardIcon} />
                  <span className={styles.cardLabel}>TELEPHONE</span>
                </div>
                <a href={`tel:${GALLERY_INFO.phone}`} className={styles.cardLink}>
                  {GALLERY_INFO.phone}
                </a>
              </div>
            </div>

            {/* Private Advisory Note */}
            <div className={styles.advisoryNote}>
              <span className={styles.noteTag}>PRIVATE ADVISORY</span>
              <p className={styles.noteText}>
                For private collection acquisitions, museum loans, or after-hours private viewings, please request a direct appointment.
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: Inquiry Form ── */}
        <div className={styles.rightPanel}>
          {submitted ? (
            /* ── Success State ── */
            <div className={styles.successWrapper}>
              <div className={styles.successInner}>
                <div className={styles.successIcon}>✓</div>
                <span className={styles.successEyebrow}>TRANSMISSION RECEIVED</span>
                <h2 className={styles.successTitle}>Thank You</h2>
                <p className={styles.successBody}>
                  Your message has been assigned to a gallery advisory specialist. We will respond within 24–48 hours.
                </p>
                <button className={styles.resetBtn} onClick={() => setSubmitted(false)}>
                  SEND ANOTHER MESSAGE
                  <ArrowRightIcon size={13} />
                </button>
              </div>
            </div>
          ) : (
            /* ── Form ── */
            <div className={styles.formWrapper}>
              <div className={styles.formHeader}>
                <span className={styles.formEyebrow}>WE&apos;D LOVE TO HEAR FROM YOU</span>
                <h2 className={styles.formTitle}>SEND AN INQUIRY</h2>
              </div>

              {/* Inquiry Type Selector */}
              <div className={styles.typeSection}>
                <span className={styles.typeLabel}>SELECT INQUIRY TYPE</span>
                <div className={styles.typeGrid}>
                  {INQUIRY_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setActiveType(type)}
                      className={`${styles.typeBtn} ${activeType === type ? styles.typeBtnActive : ""}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="c-name" className={styles.fieldLabel}>FULL NAME *</label>
                    <input
                      id="c-name"
                      type="text"
                      required
                      placeholder="e.g. James Morrison"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={styles.fieldInput}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="c-email" className={styles.fieldLabel}>EMAIL ADDRESS *</label>
                    <input
                      id="c-email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={styles.fieldInput}
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="c-message" className={styles.fieldLabel}>YOUR MESSAGE *</label>
                  <textarea
                    id="c-message"
                    rows={6}
                    required
                    placeholder="Tell us about your inquiry..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={styles.fieldTextarea}
                  />
                </div>

                <div className={styles.formFooter}>
                  <p className={styles.formDisclaimer}>
                    We respond within 24–48 hours on business days.
                  </p>
                  <button type="submit" className={styles.submitBtn}>
                    <span>SEND INQUIRY</span>
                    <ArrowRightIcon size={14} />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
