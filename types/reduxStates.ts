import { MerchProps } from "./components";

export interface CartItemProps extends MerchProps {
  quantity: number;
  size: string;
}
export interface AppState {
  theme: "lightMode" | "darkMode";
  token: string;
  merch: MerchProps[];
  cart: CartItemProps[];
  cartItemIds: string[];
  totalQuantity: number;
  isAdmin: boolean;
}
