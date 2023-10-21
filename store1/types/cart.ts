import { Dispatch, SetStateAction } from "react";
import { CartItem } from ".";

export interface Cart {
  cart: CartItem[] | null;
  setCart: Dispatch<SetStateAction<CartItem[] | null>>;
}