import CollectionPageContent from "@/components/ui/CollectionPageContent";
import { MerchProps } from "@/types/components";
import serverUrl from "@/utils/server";
import { notFound } from "next/navigation";

interface Props {
  params: { collection: string };
}

const CollectionPage: React.FC<Props> = async ({ params }) => {
  const res = await fetch(`${serverUrl}/collections/${params.collection}`, {
    next: { revalidate: 60 },
    headers: {
      Origin: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    },
  });

  const merch: MerchProps[] = await res.json();

  if (!res.ok || merch.length === 0) {
    notFound();
  }

  return <CollectionPageContent merch={merch} category={params.collection} />;
};

export default CollectionPage;
