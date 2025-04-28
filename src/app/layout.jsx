import './styles/globals.css' 
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import React from 'react'
import StoreProvider from './StoreProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: "Odin's Paw",
  description: 'Para el cuidado de tus mascotas.',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <StoreProvider >
        <html lang="es" className={inter.variable}>
          <body className="antialiased min-h-screen flex flex-col">
            <main className="flex-grow">
              {children}
            </main>
          </body>
        </html>
      </StoreProvider>
    </ClerkProvider>
  )
}