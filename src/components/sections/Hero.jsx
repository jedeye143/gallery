"use client";

import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { ArrowDownIcon } from "../ui/Icons";
import { GALLERY_INFO } from "@/data/gallery";
import styles from "./Hero.module.css";

const SLIDES = [
  {
    id: "01",
    title: "MODERN &\nCONTEMPORARY\nART",
    subtitle: GALLERY_INFO.slogan,
    image: "/images/gallery/hero-slide-1.jpg",
    ctaText: "EXPLORE ARTWORKS",
    ctaHref: "/artworks"
  },
  {
    id: "02",
    title: "ECHOES OF\nATMOSPHERE\n& SILENCE",
    subtitle: "NEW PHOTOGRAPHY EXHIBITION",
    image: "/images/gallery/hero-slide-2.jpg",
    ctaText: "VIEW EXHIBITION",
    ctaHref: "/artworks/echoes-of-silence"
  },
  {
    id: "03",
    title: "MATERIAL\n& CONTEMPORARY\nFORM",
    subtitle: "EXPLORE CERAMICS & SCULPTURE",
    image: "/images/gallery/hero-slide-3.jpg",
    ctaText: "VIEW CERAMICS",
    ctaHref: "/artworks?category=CERAMICS"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        {/* All Slide Background Images with Cinematic Color Grading */}
        {SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`${styles.imageBackground} ${idx === currentSlide ? styles.activeBg : styles.inactiveBg}`}
          >
            <img
              src={s.image}
              alt="Dawson Wells Gallery Space"
              className={styles.heroImg}
            />
            {/* Cinematic Gradient Vignette & Shadow Wash */}
            <div className={styles.cinematicOverlay} />
          </div>
        ))}

        {/* Hero Content Overlay */}
        <div className={`container-wide ${styles.contentWrapper}`}>
          <div className={styles.textBlock}>
            <h1 className={styles.heroHeadline}>
              {slide.title.split("\n").map((line, i) => (
                <span key={i} className={styles.headlineLine}>
                  {line}
                </span>
              ))}
            </h1>

            <p className={styles.heroSubtitle}>{slide.subtitle}</p>

            <div className={styles.ctaWrapper}>
              <Button href={slide.ctaHref} variant="outline" size="large" className={styles.heroCta}>
                {slide.ctaText}
              </Button>
            </div>
          </div>

          {/* Bottom Bar Controls */}
          <div className={styles.heroFooter}>
            <div className={styles.scrollIndicator}>
              <span>SCROLL TO DISCOVER</span>
              <ArrowDownIcon size={14} />
            </div>

            <div className={styles.slideIndicators}>
              {SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`${styles.slideDot} ${idx === currentSlide ? styles.activeDot : ""}`}
                  aria-label={`Go to slide ${s.id}`}
                >
                  {s.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
