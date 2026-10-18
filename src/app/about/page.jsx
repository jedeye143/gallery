import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import { GALLERY_INFO } from "@/data/gallery";
import styles from "./about.module.css";

export const metadata = {
  title: "About | Dawson Wells Gallery",
  description: "Learn about Dawson Wells Gallery's history, mission, vision, and commitment to Modern and Contemporary Art.",
};

const STATS = [
  { value: "2012", label: "ESTABLISHED" },
  { value: "8+", label: "EXHIBITIONS ANNUALLY" },
  { value: "50+", label: "REPRESENTED ARTISTS" },
  { value: "3", label: "CONTINENTS" },
];

const VALUES = [
  {
    number: "01",
    title: "ARTISTIC INTEGRITY",
    text: "We champion works of uncompromising artistic vision, curating with rigorous scholarly intent and long-term significance over commercial trend."
  },
  {
    number: "02",
    title: "COLLECTOR RELATIONS",
    text: "We build enduring partnerships with collectors, providing bespoke advisory and acquisition services tailored to each collection's unique vision."
  },
  {
    number: "03",
    title: "CULTURAL DIALOGUE",
    text: "We bridge international contemporary masters and emerging voices — fostering cross-cultural conversations that enrich global artistic discourse."
  },
];

export default function AboutPage() {
  return (
    <div className={styles.pageRoot}>

      {/* ── Back Navigation ── */}
      <div className={styles.backBar}>
        <div className="container-wide">
          <Link href="/" className={styles.backLink}>
            <ArrowLeftIcon size={14} />
            <span>BACK TO HOME</span>
          </Link>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <div className={styles.heroBanner}>
        <img
          src={GALLERY_INFO.aboutImage}
          alt="Dawson Wells Gallery Interior"
          className={styles.heroImg}
        />
        {/* Cinematic overlay */}
        <div className={styles.heroOverlay} />

        <div className={`container-wide ${styles.heroContent}`}>
          <span className={styles.heroEyebrow}>ESTABLISHED {GALLERY_INFO.established}</span>
          <h1 className={styles.heroTitle}>ABOUT<br />DAWSON WELLS<br />GALLERY</h1>
        </div>
      </div>

      {/* ── Stats Strip ── */}
      <div className={styles.statsStrip}>
        <div className="container-wide">
          <div className={styles.statsGrid}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Story Section ── */}
      <section className={styles.storySection}>
        <div className={`container-wide ${styles.storyGrid}`}>

          <div className={styles.storyLead}>
            <span className={styles.sectionTag}>OUR STORY</span>
            <p className={styles.leadText}>{GALLERY_INFO.about.lead}</p>
          </div>

          <div className={styles.storyBody}>
            <p className={styles.bodyText}>
              Located in the vibrant contemporary art district, Dawson Wells Gallery is committed to exhibiting international contemporary masters alongside pioneering emerging talents.
            </p>
            <p className={styles.bodyText}>
              Our curatorial focus centers on material purity, architectural clarity, and emotional depth. We hold eight major exhibitions annually, publishing scholarly exhibition catalogues and participating in leading global art fairs.
            </p>
            <p className={styles.bodyText}>
              Beyond public exhibitions, the gallery provides bespoke advisory services for private collectors, museums, and corporate collections seeking enduring masterworks.
            </p>
          </div>
        </div>
      </section>

      {/* ── Gold Divider ── */}
      <div className={styles.goldDivider}>
        <div className="container-wide">
          <div className={styles.dividerLine} />
        </div>
      </div>

      {/* ── Mission & Vision ── */}
      <section className={styles.mvSection}>
        <div className="container-wide">
          <div className={styles.mvGrid}>
            <div className={styles.mvCard}>
              <span className={styles.mvTag}>OUR PURPOSE</span>
              <h2 className={styles.mvTitle}>{GALLERY_INFO.mission.title}</h2>
              <p className={styles.mvText}>{GALLERY_INFO.mission.text}</p>
            </div>

            <div className={styles.mvVerticalDivider} />

            <div className={styles.mvCard}>
              <span className={styles.mvTag}>OUR COMMITMENT</span>
              <h2 className={styles.mvTitle}>{GALLERY_INFO.vision.title}</h2>
              <p className={styles.mvText}>{GALLERY_INFO.vision.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className={styles.valuesSection}>
        <div className="container-wide">
          <span className={styles.sectionTag}>WHAT WE STAND FOR</span>
          <h2 className={styles.valuesHeading}>OUR CORE VALUES</h2>

          <div className={styles.valuesGrid}>
            {VALUES.map((v) => (
              <div key={v.number} className={styles.valueCard}>
                <span className={styles.valueNumber}>{v.number}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueText}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className={styles.ctaSection}>
        <div className="container-wide">
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>DISCOVER OUR COLLECTION</h2>
            <p className={styles.ctaText}>
              Explore works by the artists we represent and inquire about acquisition.
            </p>
            <Link href="/artworks" className={styles.ctaButton}>
              VIEW ALL ARTWORKS
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
