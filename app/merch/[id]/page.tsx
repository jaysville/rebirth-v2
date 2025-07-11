import SingleMerchPage from "@/components/ui/SingleMerchContent";
import { MerchProps } from "@/types/components";
import serverUrl from "@/utils/server";
import { notFound } from "next/navigation";
interface Props {
  params: Promise<{ id: string }>;
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
