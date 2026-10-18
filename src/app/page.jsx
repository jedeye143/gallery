import Hero from "@/components/sections/Hero";
import FeaturedArtworks from "@/components/sections/FeaturedArtworks";
import GalleryIntroduction from "@/components/sections/GalleryIntroduction";
import MissionVision from "@/components/sections/MissionVision";
import NewsPreview from "@/components/sections/NewsPreview";

export const metadata = {
  title: "Dawson Wells Gallery | Modern & Contemporary Art",
  description: "Discover curated modern and contemporary artwork by international masters and pioneering emerging voices."
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedArtworks />
      <GalleryIntroduction />
      <MissionVision />
      <NewsPreview />
    </>
  );
}
