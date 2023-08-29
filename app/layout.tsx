import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Finn Holland',
  description: 'Cloud Engineer Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='content-center justify-center items-center flex'>
      <body className={`${inter.className} h-screen w-screen justify-center items-center flex`}>{children}</body>
    </html>
  )
}
