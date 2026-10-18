import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import { getNewsBySlug, getAllNews } from "@/lib/newsHelpers";
import styles from "./newsDetail.module.css";

export async function generateStaticParams() {
  const newsList = getAllNews();
  return newsList.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) return { title: "Article Not Found | Dawson Wells Gallery" };
  return {
    title: `${article.title} | Dawson Wells Gallery`,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) notFound();

  // Parse paragraphs — strip empty lines
  const paragraphs = article.content
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  // First paragraph is the lead
  const leadParagraph = paragraphs[0];
  const bodyParagraphs = paragraphs.slice(1);

  return (
    <div className={styles.pageRoot}>

      {/* ── Cinematic Hero Banner with Image ── */}
      <div className={styles.heroBanner}>
        <img
          src={article.image}
          alt={article.title}
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay} />

        {/* Back nav inside hero */}
        <div className={`container-wide ${styles.heroTopBar}`}>
          <Link href="/news" className={styles.backLink}>
            <ArrowLeftIcon size={13} />
            <span>BACK TO NEWS</span>
          </Link>
        </div>

        {/* Article title anchored bottom */}
        <div className={`container-wide ${styles.heroContent}`}>
          <div className={styles.heroCategoryRow}>
            <span className={styles.heroCategoryBadge}>{article.category}</span>
            <span className={styles.heroDate}>{article.date}</span>
          </div>
          <h1 className={styles.heroTitle}>{article.title}</h1>
        </div>
      </div>

      {/* ── Article Body ── */}
      <div className={styles.articleWrapper}>
        <div className={styles.articleInner}>

          {/* Excerpt / Pull Quote */}
          <p className={styles.excerptText}>{article.excerpt}</p>

          {/* Gold Rule */}
          <div className={styles.goldRule} />

          {/* Lead Paragraph */}
          {leadParagraph && (
            <p className={styles.leadParagraph}>{leadParagraph}</p>
          )}

          {/* Body Paragraphs */}
          {bodyParagraphs.map((para, idx) => (
            <p key={idx} className={styles.bodyParagraph}>{para}</p>
          ))}

          {/* Footer Nav */}
          <div className={styles.articleFooter}>
            <div className={styles.footerDivider} />
            <div className={styles.footerRow}>
              <div className={styles.footerMeta}>
                <span className={styles.footerLabel}>PUBLISHED BY</span>
                <span className={styles.footerValue}>Dawson Wells Gallery</span>
              </div>
              <div className={styles.footerMeta}>
                <span className={styles.footerLabel}>CATEGORY</span>
                <span className={styles.footerValue}>{article.category}</span>
              </div>
              <div className={styles.footerMeta}>
                <span className={styles.footerLabel}>DATE</span>
                <span className={styles.footerValue}>{article.date}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── CTA Strip ── */}
      <div className={styles.ctaStrip}>
        <div className="container-wide">
          <div className={styles.ctaInner}>
            <span className={styles.ctaLabel}>CONTINUE EXPLORING</span>
            <div className={styles.ctaLinks}>
              <Link href="/news" className={styles.ctaLink}>
                ← All News & Updates
              </Link>
              <Link href="/artworks" className={styles.ctaLinkGold}>
                View the Collection →
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
