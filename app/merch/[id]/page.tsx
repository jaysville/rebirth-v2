import SingleMerchPage from "@/components/ui/SingleMerchContent";
import { MerchProps } from "@/types/components";
import serverUrl from "@/utils/server";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const MerchDetails: React.FC<Props> = async ({ params }) => {
  const res = await fetch(`${serverUrl}/merch/${params.id}`, {
    next: { revalidate: 60 },
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
