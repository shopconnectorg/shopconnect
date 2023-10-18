"use client";

import { Navbar } from "@/components"
import { useEffect, useState, createContext } from 'react'
import { Listing, Cart } from '@/types'

export const cartContext = createContext<Cart | null>(null);

export default function Template({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Listing[] | null>(null);

  return (
    <div className="bg-base-100">
      <cartContext.Provider value={{ cart, setCart }}>
        <Navbar />
        {children}
      </cartContext.Provider>
    </div>  
  )
}