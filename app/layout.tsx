import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
    <html lang="en" className='bg-blue-950 content-center justify-center items-center flex'>
      <body className={`${inter.className} h-screen w-screen justify-center items-center flex`}>{children}</body>
    </html>
  )
}
