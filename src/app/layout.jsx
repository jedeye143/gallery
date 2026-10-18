import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://dawsongallery.vercel.app"
  ),
  title: {
    default: "Dawson Wells Gallery | Modern & Contemporary Art",
    template: "%s | Dawson Wells Gallery",
  },
  description:
    "Premier international gallery specializing in Modern and Contemporary Art across photography, oil paintings, drawings, ceramics, and prints.",
  keywords: [
    "Art Gallery",
    "Modern Art",
    "Contemporary Art",
    "Fine Art",
    "Dawson Wells Gallery",
    "Exhibitions",
    "Art Collecting",
  ],
  openGraph: {
    title: "Dawson Wells Gallery | Modern & Contemporary Art",
    description:
      "Premier international gallery specializing in Modern and Contemporary Art across photography, oil paintings, drawings, ceramics, and prints.",
    url: "https://dawsongallery.vercel.app",
    siteName: "Dawson Wells Gallery",
    images: [
      {
        url: "/images/gallery/hero-interior.jpg",
        width: 1200,
        height: 630,
        alt: "Dawson Wells Gallery — Elegant interior exhibition space featuring curated contemporary artworks",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dawson Wells Gallery | Modern & Contemporary Art",
    description:
      "Premier international gallery specializing in Modern and Contemporary Art across photography, oil paintings, drawings, ceramics, and prints.",
    images: ["/images/gallery/hero-interior.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body>
        <SidebarLayout>
          {children}
          <Footer />
        </SidebarLayout>
      </body>
    </html>
  );
}
