import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ShopConnectPlugin from '@/shopconnect-plugin/components/ShopConnectPlugin';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dracula">
      <body className={inter.className}>
        {children}
        <ShopConnectPlugin />
      </body>
    </html>
  )
}
