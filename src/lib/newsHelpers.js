import { NEWS_DATA } from "@/data/news";

export function getAllNews() {
  return NEWS_DATA;
}

export function getNewsBySlug(slug) {
  return NEWS_DATA.find((item) => item.slug === slug) || null;
}

export function getRecentNews(count = 3) {
  return NEWS_DATA.slice(0, count);
}
