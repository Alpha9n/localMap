"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header';
import { NextUIProvider } from '@nextui-org/react';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="ja">
          <body className={inter.className}>
            <NextUIProvider>
              <Header/>
              {children}
            </NextUIProvider>
          </body>
      </html>
  )
}
