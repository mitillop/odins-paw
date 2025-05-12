import "./styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Manrope } from "next/font/google";
import React from "react";
import StoreProvider from "./StoreProvider";
import Providers from "../providers";
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "Odin's Paw",
  description: "Para el cuidado de tus mascotas.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <Providers>
        <StoreProvider>
          <html lang="es" data-theme="caramellatte">
            <body
              className={`antialiased min-h-screen flex flex-col ${manrope.variable}`}
            >
              <main className="flex-grow">{children}</main>
            </body>
          </html>
        </StoreProvider>
      </Providers>
    </ClerkProvider>
  );
}
