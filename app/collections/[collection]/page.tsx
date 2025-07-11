import CollectionPageContent from "@/components/ui/CollectionPageContent";
import { MerchProps } from "@/types/components";
import serverUrl from "@/utils/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
interface Props {
  params: Promise<{ collection: string }>;
}

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Explore All Collections – Rebirth Island Apparel",
    description:
      "Shop the full Rebirth Island Collection: Premium streetwear for men, women, and accessories. Elevate your style and energy today.",
    keywords: [
      "Rebirth Island collections",
      "Rebirth clothing Nigeria",
      "Men’s streetwear Nigeria",
      "Women’s fashion Lagos",
      "Spiritual fashion",
      "Afro streetwear",
      "Accessories for men and women",
      "High vibration clothing",
      "Rebirth accessories",
    ],
    openGraph: {
      title: "Rebirth Island Collections – Men, Women & Accessories",
      description:
        "Dive into the full Rebirth Island lineup. Shop clean designs for men, women, and conscious fashion lovers. Start your rebirth now.",
      url: "https://rebirthisland.store/",
      siteName: "Rebirth Island",
      images: [
        {
          url: "https://rebirthisland.store/assets/L4.jpg",
          width: 1200,
          height: 630,
          alt: "Rebirth Collections Overview – Men, Women, Accessories",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Rebirth Island – Full Collection Now Live",
      description:
        "Men’s, women’s and accessories drops – all in one place. Explore the full rebirth collection.",
      images: ["https://rebirthisland.store/assets/L4.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL("https://rebirthisland.store"),
  };
};

const CollectionPage = async ({ params }: Props) => {
  const { collection } = await params;

  const res = await fetch(`${serverUrl}/collections/${collection}`, {
    next: { revalidate: 60 },
    headers: {
      Origin: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    },
  });

  const merch: MerchProps[] = await res.json();

  if (!res.ok || merch.length === 0) {
    notFound();
  }

  return <CollectionPageContent merch={merch} category={collection} />;
};

export default CollectionPage;
