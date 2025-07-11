import { MerchProps } from "./components";

export interface CartItemProps extends MerchProps {
  quantity: number;
  size: string;
}

export interface UserProps {
  name: string;
  email: string;
  isAdmin: boolean;
  userId: string;
}

export interface AppState {
  user: UserProps | null;
  token: string | null;
  merch: MerchProps[];
  cart: CartItemProps[];
  cartItemIds: string[];
  totalQuantity: number;
  isAdmin: boolean;
  sessionExpiresAt: number | null;
}
