import "./styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { Manrope } from "next/font/google";
import React from "react";
import StoreProvider from "./StoreProvider";
import Providers from "../providers";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "Odin's Paw | Cuidado Inteligente para Mascotas",
  description:
    "Plataforma líder en cuidado personalizado de mascotas. Planes de alimentación, seguimiento de salud y atención veterinaria 24/7.",
  keywords:
    "cuidado de mascotas, veterinaria, salud animal, nutrición animal, mascotas, perros, gatos",
  openGraph: {
    title: "Odin's Paw | Cuidado Inteligente para Mascotas",
    description:
      "Plataforma líder en cuidado personalizado de mascotas. Planes de alimentación, seguimiento de salud y atención veterinaria 24/7.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      localization={esES}
    >
      <Providers>
        <StoreProvider>
          <html lang="es" data-theme="caramellatte">
            <body
              className={`antialiased min-h-screen flex flex-col ${manrope.variable} scroll-smooth`}
            >
              <main className="flex-grow">{children}</main>
            </body>
          </html>
        </StoreProvider>
      </Providers>
    </ClerkProvider>
  );
}
