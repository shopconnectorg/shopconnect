"use client";

import { Navbar } from "@/components"
import { useEffect, useState, createContext } from 'react'
import { Listing, Cart, CartItem } from '@/types'

export const cartContext = createContext<Cart | null>(null);

export default function Template({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[] | null>(null);

  return (
    <div className="min-h-screen">
      <cartContext.Provider value={{ cart, setCart }}>
        <Navbar/>
        {children}
      </cartContext.Provider>
    </div>  
  )
}