// app/collections/[collection]/page.tsx

import CollectionPageContent from "@/components/ui/CollectionPageContent";
import { MerchProps } from "@/types/components";
import serverUrl from "@/utils/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
interface Props {
  params: Promise<{ collection: string }>;
}

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
