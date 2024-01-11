import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

import { ModalProvider } from '@/components/ModalProvider'
import { ToastProvider } from '@/components/ToasterProvider'
import { CrispProvider } from '@/components/CrispProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ai-next',
  description: 'ai-platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ModalProvider />
          <ToastProvider />
          <CrispProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
