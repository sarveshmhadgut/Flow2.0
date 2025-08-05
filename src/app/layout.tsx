import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Modal from "@/components/Modal"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flow 2.0',
  description: 'Project Management App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        {children}
        <Modal />
      </body>
    </html>
  )
}
