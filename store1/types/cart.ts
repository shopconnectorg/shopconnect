import { Dispatch, SetStateAction } from "react";
import { CartItem } from ".";

export interface Cart {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
}