import SingleMerchPage from "@/components/ui/SingleMerchContent";
import { MerchProps } from "@/types/components";
import serverUrl from "@/utils/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { id } = params;
  try {
    const res = await fetch(`${serverUrl}/merch/${id}`, {
      headers: {
        Origin: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
      },
      next: { revalidate: 60 },
    });

    const product: MerchProps = await res.json();

    const title = `${product.name} | Rebirth Island`;
    const description = `${product.name} is part of the exclusive Rebirth Collection — a bold fusion of streetwear, spirit, and storytelling.

Born from the idea that style is energy, every piece in this collection carries the essence of transformation, identity, and high vibration living. Whether it’s the rugged minimalism of our tees, the elemental balance in our hoodies, or the raw edge of our caps — each item is designed to represent rebirth in your own unique form.

Crafted with care using premium materials and infused with symbolic details, ${product.name} is more than apparel — it’s wearable philosophy. It speaks to those rising from silence into self-expression, from routine into purpose, from being seen into truly being.

This is not just merch — it’s movement. A visual language for the awakened. The wild. The reborn.`;

    return {
      title,
      description,
      keywords: [
        product.name,
        "Rebirth Island",
        "streetwear",
        "Afro streetwear",
        "symbolic fashion",
        "urban style",
      ],
      openGraph: {
        title,
        description,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/merch/${id}`,
        siteName: "Rebirth Island",
        images: product.images?.map((url) => ({
          url,
          width: 1200,
          height: 630,
          alt: `${product.name} - Rebirth Island Apparel`,
        })),
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: product.images,
      },
      robots: {
        index: true,
        follow: true,
      },
      metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL! || "http://localhost:3000"
      ),
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "Merch | Rebirth Island",
      description: "Explore premium merch from the Rebirth Collection.",
    };
  }
}

const MerchDetails: React.FC<Props> = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`${serverUrl}/merch/${id}`, {
    cache: "no-store",
    headers: {
      Origin: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    },
  });

  if (!res.ok) {
    notFound();
  }

  const merch: MerchProps = await res.json();

  return <SingleMerchPage merch={merch} />;
};

export default MerchDetails;
