import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArtworkGallery from "@/components/artwork/ArtworkGallery";
import ArtworkInfo from "@/components/artwork/ArtworkInfo";
import ArtworkNavigation from "@/components/artwork/ArtworkNavigation";
import ArtworkCard from "@/components/artwork/ArtworkCard";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import { getArtworkBySlug, getAdjacentArtworks, getAllArtworks } from "@/lib/artworkHelpers";
import styles from "./artworkDetail.module.css";

export async function generateStaticParams() {
  const artworks = getAllArtworks();
  return artworks.map((art) => ({
    slug: art.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) return { title: "Artwork Not Found | Dawson Wells Gallery" };

  const description = `${artwork.title} (${artwork.year}) — ${artwork.medium}. ${artwork.description.slice(0, 120)}...`;

  return {
    title: `${artwork.title} by ${artwork.artist} | Dawson Wells Gallery`,
    description,
    openGraph: {
      title: `${artwork.title} by ${artwork.artist}`,
      description,
      url: `https://dawsonwellsgallery.com/artworks/${slug}`,
      siteName: "Dawson Wells Gallery",
      images: [
        {
          url: artwork.images[0],
          width: 1200,
          height: 630,
          alt: `${artwork.title} by ${artwork.artist} — ${artwork.medium}`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${artwork.title} by ${artwork.artist}`,
      description,
      images: [artwork.images[0]],
    },
  };
}

export default async function ArtworkDetailPage({ params }) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);

  if (!artwork) {
    notFound();
  }

  const { prev, next } = getAdjacentArtworks(slug);
  const allArtworks = getAllArtworks();

  // Curate related artworks (same category or same artist, excluding current)
  const relatedArtworks = allArtworks
    .filter((a) => a.id !== artwork.id && (a.category === artwork.category || a.artist === artwork.artist))
    .slice(0, 3);

  return (
    <div className={styles.pageRoot}>
      {/* Top Sticky Navigation Bar */}
      <div className={styles.topNav}>
        <div className="container-wide">
          <div className={styles.topNavInner}>
            <Link href="/artworks" className={styles.backLink}>
              <ArrowLeftIcon size={14} />
              <span>BACK TO ARTWORKS COLLECTION</span>
            </Link>
            <span className={styles.topNavRef}>
              CATALOGUE PROSPECTUS &bull; {artwork.category}
            </span>
          </div>
        </div>
      </div>

      {/* Main Detail Split Section */}
      <div className={styles.mainSection}>
        <div className="container-wide">
          <div className={styles.grid}>
            {/* Left Column: Museum Spotlight Stage Viewer */}
            <div className={styles.galleryCol}>
              <ArtworkGallery images={artwork.images} title={artwork.title} />
            </div>

            {/* Right Column: Fine Art Prospectus & Spec Sheet */}
            <div className={styles.infoCol}>
              <ArtworkInfo artwork={artwork} />
            </div>
          </div>

          {/* Previous / Next Artwork Navigation */}
          <ArtworkNavigation prev={prev} next={next} />
        </div>
      </div>

      {/* Curated Selections Section */}
      {relatedArtworks.length > 0 && (
        <section className={styles.relatedSection}>
          <div className="container-wide">
            <div className={styles.relatedHeader}>
              <span className={styles.relatedTag}>CURATED SELECTIONS</span>
              <h2 className={styles.relatedTitle}>
                MORE WORKS IN {artwork.category}
              </h2>
            </div>

            <div className={styles.relatedGrid}>
              {relatedArtworks.map((item) => (
                <ArtworkCard key={item.id} artwork={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
