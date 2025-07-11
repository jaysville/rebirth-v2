import Landing from "@/components/ui/LandingBanners";

import serverUrl from "@/utils/server";

import LandingContent from "@/components/ui/LandingContent";

import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Rebirth Island – High Vibration Streetwear",
    description:
      "Discover bold, clean, and conscious fashion at Rebirth Island. Shop high-vibe apparel for self-expression, confidence, and evolution.",
    keywords: [
      "Rebirth Island",
      "Rebirth streetwear",
      "Spiritual fashion Nigeria",
      "High vibration clothing",
      "Minimalist hoodie",
      "Conscious apparel",
      "Afro streetwear",
      "Bold fashion",
    ],
    openGraph: {
      title: "Rebirth Island – Conscious Streetwear",
      description:
        "From minimalist hoodies to elevated daily fits, Rebirth is the evolution of high-energy fashion.",
      url: "https://rebirthisland.store",
      siteName: "Rebirth Island",
      images: [
        {
          url: "https://rebirthisland.store/assets/L4.jpg",
          width: 1200,
          height: 630,
          alt: "Rebirth Island Landing Page – Clean Bold Fashion",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Rebirth Island – Streetwear for the Awakened",
      description:
        "High-quality apparel crafted for bold self-expression. Explore trending merch and best sellers now.",
      images: ["https://rebirthisland.store/assets/L4.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL("https://rebirthisland.store"),
  };
};

const HomePage: React.FC = async () => {
  const res = await fetch(`${serverUrl}/merch`, {
    next: { revalidate: 60 },
    headers: {
      Origin: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    },
  });

  const merch = await res.json();

  return (
    <>
      <Landing />
      <LandingContent merch={merch} />
    </>
  );
};

export default HomePage;
