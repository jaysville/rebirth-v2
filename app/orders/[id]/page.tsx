import SingleOrderDetails from "@/components/ui/SingleOrderContent";
import { OrderProps } from "@/types/components";
import serverUrl from "@/utils/server";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const OrderDetails: React.FC<Props> = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`${serverUrl}/order/${id}`, {
    next: { revalidate: 60 },
    headers: {
      Origin: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    },
  });

  if (!res.ok) notFound();

  const order: OrderProps = await res.json();
  console.log(order);
  return <SingleOrderDetails order={order} />;
};

export default OrderDetails;
