import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Navbar from './navbar';
import './globals.css'
import ShopConnectPlugin from '@/shopconnect-plugin/components/ShopConnectPlugin';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Coffee',
  description: 'ShopConnect Coffee Machine store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dracula">
      <body className={inter.className}>
        <Navbar />
        {children}
        <ShopConnectPlugin />
      </body>
    </html>
  )
}
