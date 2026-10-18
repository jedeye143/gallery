"use client";

import React, { useState } from "react";
import { CloseIcon, ArrowRightIcon } from "./Icons";
import styles from "./InquireModal.module.css";

const INQUIRY_REASONS = [
  "Price & Availability",
  "Private Viewing",
  "Condition Report",
  "Collector Advisory"
];

export default function InquireModal({ isOpen, onClose, artwork }) {
  const [submitted, setSubmitted] = useState(false);
  const [activeReason, setActiveReason] = useState("Price & Availability");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: artwork
      ? `I am interested in acquiring "${artwork.title}" (${artwork.medium}, ${artwork.year}). Please provide pricing, edition availability, and private viewing details.`
      : ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    onClose();
  };

  const artworkImage = artwork?.images?.[0] || "/images/gallery/hero-slide-1.jpg";

  return (
    <div className={styles.backdrop} onClick={resetForm}>
      <div className={styles.dossierModal} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={resetForm} aria-label="Close modal">
          <CloseIcon size={18} />
        </button>

        {/* ── LEFT PANEL: Artwork Preview Dossier ── */}
        <div className={styles.artworkPreviewPanel}>
          <div className={styles.artworkFrameWrapper}>
            <img src={artworkImage} alt={artwork?.title} className={styles.artworkImg} />
            <div className={styles.frameGlare} />
          </div>

          <div className={styles.artworkMetaBlock}>
            <span className={styles.galleryTag}>DAWSON WELLS GALLERY</span>
            <h3 className={styles.artworkTitle}>{artwork?.title}</h3>
            <p className={styles.artistName}>{artwork?.artist}</p>
            
            <div className={styles.specDivider} />

            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>MEDIUM</span>
              <span className={styles.metaValue}>{artwork?.medium}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>DIMENSIONS</span>
              <span className={styles.metaValue}>{artwork?.dimensions}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>YEAR</span>
              <span className={styles.metaValue}>{artwork?.year}</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: Private Inquiry Form ── */}
        <div className={styles.formPanel}>
          {submitted ? (
            <div className={styles.successState}>
              <div className={styles.successSeal}>✓</div>
              <span className={styles.goldEyebrow}>TRANSMISSION CONFIRMED</span>
              <h3 className={styles.successTitle}>Inquiry Received</h3>
              <p className={styles.successBody}>
                Your private dossier for <strong>&quot;{artwork?.title}&quot;</strong> has been assigned to a Senior Art Advisor. Expect a response within 12–24 hours.
              </p>
              <button className={styles.closeModalBtn} onClick={resetForm}>
                RETURN TO GALLERY
              </button>
            </div>
          ) : (
            <div className={styles.formContent}>
              <div className={styles.formHeader}>
                <span className={styles.goldEyebrow}>PRIVATE ACQUISITION DOSSIER</span>
                <h2 className={styles.modalHeading}>COLLECTOR INQUIRY</h2>
              </div>

              {/* Inquiry Reason Chips */}
              <div className={styles.reasonSection}>
                <span className={styles.fieldLabel}>PRIMARY INQUIRY PURPOSE</span>
                <div className={styles.chipGrid}>
                  {INQUIRY_REASONS.map((reason) => (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => setActiveReason(reason)}
                      className={`${styles.reasonChip} ${activeReason === reason ? styles.reasonChipActive : ""}`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="inquiry-name" className={styles.fieldLabel}>FULL NAME *</label>
                    <input
                      id="inquiry-name"
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={styles.inputField}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="inquiry-email" className={styles.fieldLabel}>EMAIL ADDRESS *</label>
                    <input
                      id="inquiry-email"
                      type="email"
                      required
                      placeholder="eleanor@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={styles.inputField}
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="inquiry-phone" className={styles.fieldLabel}>PHONE NUMBER (OPTIONAL)</label>
                  <input
                    id="inquiry-phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="inquiry-message" className={styles.fieldLabel}>INQUIRY DETAILS</label>
                  <textarea
                    id="inquiry-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={styles.textareaField}
                  />
                </div>

                <button type="submit" className={styles.submitDossierBtn}>
                  <span>TRANSMIT PRIVATE INQUIRY</span>
                  <ArrowRightIcon size={16} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
