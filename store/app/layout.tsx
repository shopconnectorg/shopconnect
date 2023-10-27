import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Navbar from './navbar';
import './globals.css'
import ShopConnectPlugin from '@/shopconnect-plugin/components/ShopConnectPlugin';
import { storeId } from '@/data/storeData';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Coffee',
  description: 'ShopConnect Coffee store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} data-theme="light">
        <Navbar />
        {children}
        <ShopConnectPlugin />
        <footer className={`footer items-center p-4 text-neutral-content h-24 ${storeId === 'store1' ? 'bg-blue-600' : 'bg-amber-600'}`}></footer>
      </body>
    </html>
  )
}
