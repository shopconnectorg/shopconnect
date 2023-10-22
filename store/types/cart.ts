import { CartItem } from ".";

export interface Cart {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
}
