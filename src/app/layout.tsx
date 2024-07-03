import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header';
import { Providers } from './providers';
import Head from 'next/head';
import { Metadata, Viewport } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export const metadata: Metadata = {
  title: {
    template: '%s | ご当地マップ',
    default: 'ご当地マップ'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="ja">
          <body className={inter.className + "text-foreground-50 bg-foreground-100 h-dvh"}>
            <Providers>
                <Header/>
                {children}
            </Providers>
          </body>
      </html>
  )
}
