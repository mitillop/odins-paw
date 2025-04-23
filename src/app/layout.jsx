import './styles/globals.css' 
import { ClerkProvider, SignedIn, UserButton } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import React from 'react'
import StoreProvider from './StoreProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: "Odin's Paw",
  description: 'Para el cuidado de tus mascotas.',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <StoreProvider>
        <html lang="en">
          <body className={`antialiased ${geistSans.variable} ${geistMono.variable}`}>
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
            {children}
          </body>
        </html>
      </StoreProvider>
    </ClerkProvider>
  )
}
