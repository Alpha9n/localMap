"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="ja">
          <body className={inter.className + "dark:text-gray-50 h-screen"}>
            <Providers>
                <Header/>
                {children}
            </Providers>
          </body>
      </html>
  )
}
