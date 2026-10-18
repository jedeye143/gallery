export function formatCategory(cat) {
  if (!cat) return "";
  return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
}

export function truncateText(text, maxLength = 120) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}
