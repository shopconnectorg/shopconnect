"use client";

import { Cart, CartItem } from "@/types";
import { create } from 'zustand'

export const useCart = create<Cart>((set) => ({
  cart: [],
  setCart: (cart: CartItem[]) => set({ cart }),
}));

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
