import { ARTWORKS_DATA } from "@/data/artworks";

export function getAllArtworks() {
  return ARTWORKS_DATA;
}

export function getArtworkBySlug(slug) {
  return ARTWORKS_DATA.find((item) => item.slug === slug) || null;
}

export function getArtworksByCategory(category) {
  if (!category || category.toUpperCase() === "ALL") {
    return ARTWORKS_DATA;
  }
  return ARTWORKS_DATA.filter(
    (item) => item.category.toUpperCase() === category.toUpperCase()
  );
}

export function getFeaturedArtworks() {
  return ARTWORKS_DATA.filter((item) => item.featured);
}

export function getAdjacentArtworks(currentSlug) {
  const index = ARTWORKS_DATA.findIndex((item) => item.slug === currentSlug);
  if (index === -1) return { prev: null, next: null };

  const prev = index > 0 ? ARTWORKS_DATA[index - 1] : ARTWORKS_DATA[ARTWORKS_DATA.length - 1];
  const next = index < ARTWORKS_DATA.length - 1 ? ARTWORKS_DATA[index + 1] : ARTWORKS_DATA[0];

  return { prev, next };
}
