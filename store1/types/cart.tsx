import { Dispatch, SetStateAction } from "react";
import { Listing } from "@/types";

interface Cart {
  cart: Listing[] | null;
  setCart: Dispatch<SetStateAction<Listing[] | null>>;
}

export type { Cart }