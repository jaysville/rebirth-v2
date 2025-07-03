import { MerchProps } from "./components";

export interface CartItemProps extends MerchProps {
  quantity: number;
  size: string;
}
export interface AppState {
  token: string | null;
  merch: MerchProps[];
  cart: CartItemProps[];
  cartItemIds: string[];
  totalQuantity: number;
  isAdmin: boolean;
  sessionExpiresAt: number | null;
}
