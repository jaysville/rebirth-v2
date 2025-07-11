import { CartItemProps } from "./reduxStates";

export interface MerchProps {
  name: string;
  price: number;
  description: string;
  thumbmail: string;
  _id: string;
  images: string[];
  sizes: string[];
  __v: number;
  category: string;
  discountPrice?: number;
  soldout: boolean;
}

interface OrderProducts extends CartItemProps {
  image: string;
}

export interface OrderProps {
  _id?: string;
  email: string;
  phone: string;
  userId?: string;
  address: string;
  landmark: string;
  state: string;
  fullName: string;
  city: string;
  products: OrderProducts[];
  totalAmount: number;
  status: "Pending" | "Received" | "Shipped" | "Delivered" | string;
  createdAt: number | Date;
}
