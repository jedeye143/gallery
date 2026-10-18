import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";
import { getFeaturedArtworks } from "@/lib/artworkHelpers";
import styles from "./FeaturedArtworks.module.css";

export default function FeaturedArtworks() {
  const featured = getFeaturedArtworks().slice(0, 5);
  const [main, ...rest] = featured;

  return (
    <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="container-wide">
        <div className={styles.sectionHeader}>
          <div>
            <span className="text-subheading">CURATED SELECTION</span>
            <h2 className="heading-lg" style={{ marginTop: "0.5rem" }}>
              FEATURED ARTWORKS
            </h2>
          </div>
          <Link href="/artworks" className={styles.viewAllLink}>
            EXPLORE ALL →
          </Link>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className={styles.editorialGrid}>
          {/* Main large left feature */}
          {main && (
            <Link href={`/artworks/${main.slug}`} className={`${styles.featuredItem} ${styles.mainFeature}`}>
              <div className={styles.imageFill}>
                <Image
                  src={main.images[0]}
                  alt={main.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  className={styles.featuredImg}
                />
              </div>
              <div className={styles.featuredOverlay}>
                <div className={styles.featuredInfo}>
                  <span className={styles.featuredCategory}>
                    {main.category.charAt(0) + main.category.slice(1).toLowerCase()}
                  </span>
                  <h3 className={styles.featuredTitle}>{main.title}</h3>
                  <span className={styles.featuredYear}>{main.year}</span>
                </div>
              </div>
            </Link>
          )}

          {/* Right column: 2 stacked + 1 wide bottom */}
          <div className={styles.rightStack}>
            {rest.slice(0, 2).map((art) => (
              <Link key={art.id} href={`/artworks/${art.slug}`} className={`${styles.featuredItem} ${styles.stackItem}`}>
                <div className={styles.imageFill}>
                  <Image
                    src={art.images[0]}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: "cover" }}
                    className={styles.featuredImg}
                  />
                </div>
                <div className={styles.featuredOverlay}>
                  <div className={styles.featuredInfo}>
                    <span className={styles.featuredCategory}>
                      {art.category.charAt(0) + art.category.slice(1).toLowerCase()}
                    </span>
                    <h3 className={styles.featuredTitle}>{art.title}</h3>
                    <span className={styles.featuredYear}>{art.year}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom wide strip — 2 items side by side */}
          {rest.slice(2, 4).map((art) => (
            <Link key={art.id} href={`/artworks/${art.slug}`} className={`${styles.featuredItem} ${styles.bottomItem}`}>
              <div className={styles.imageFill}>
                <Image
                  src={art.images[0]}
                  alt={art.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className={styles.featuredImg}
                />
              </div>
              <div className={styles.featuredOverlay}>
                <div className={styles.featuredInfo}>
                  <span className={styles.featuredCategory}>
                    {art.category.charAt(0) + art.category.slice(1).toLowerCase()}
                  </span>
                  <h3 className={styles.featuredTitle}>{art.title}</h3>
                  <span className={styles.featuredYear}>{art.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.bottomCta}>
          <Button href="/artworks" variant="outline" size="medium">
            VIEW ENTIRE COLLECTION
          </Button>
        </div>
      </div>
    </section>
  );
}
