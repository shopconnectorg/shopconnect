"use client";

import { Navbar } from "@/components"
import { useEffect, useState, createContext } from 'react'
import { Listing, Cart, CartItem } from '@/types'
import { create } from 'zustand'

export const useCart = create<Cart>((set) => ({
  cart: [],
  setCart: (cart: CartItem[]) => set({ cart }),
}))


export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar/>
      {children}
    </div>  
  )
}