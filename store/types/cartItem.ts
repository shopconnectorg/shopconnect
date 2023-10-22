import { Listing } from "."

export interface CartItem extends Listing {
  quantity: number;
}