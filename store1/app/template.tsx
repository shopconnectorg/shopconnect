"use client";

import { Navbar } from "@/components";
import { useEffect, useState, createContext } from "react";
import { Listing, Cart, CartItem } from "@/types";
import { create } from "zustand";

export const useCart = create<Cart>((set) => ({
  cart: [],
  setCart: (cart: CartItem[]) => set({ cart }),
}));

export const useLoading = create<{
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));

export default function Template({ children }: { children: React.ReactNode }) {
  const isLoading = useLoading((state) => state.loading);

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          <Navbar />
          {children}
        </>
      )}
    </div>
  );
}
