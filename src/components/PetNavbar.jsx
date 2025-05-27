"use client";
import { useEffect, useState } from "react";
import React from "react";
import { useAppSelector } from "../libs/hooks";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { History, PawPrint, Cat, Dog, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePets } from "../hooks/usePets";
import { usePathname } from "next/navigation";

function PetNavbar() {
  const selectedPet = useAppSelector((state) => state.pet.selectedPet);
  const { pets, isLoading } = usePets();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHistoryPage = pathname === "/dashboard/history";

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="navbar bg-base-100 shadow-lg border-b border-base-200 fixed top-0 left-0 right-0 z-50 px-4 lg:px-6">
      {/* Logo y marca */}
      <div className="navbar-start">
        <Link
          href="/dashboard"
          className="btn btn-ghost text-xl font-bold hover:bg-primary/10 transition-colors duration-200"
          onClick={closeMobileMenu}
        >
          <PawPrint className="text-primary" size={24} />
          <span className="hidden sm:inline text-primary">Odin's Paw</span>
        </Link>
      </div>

      {!isHistoryPage && selectedPet && (
        <div className="navbar-center hidden lg:flex">
          <div className="flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-base-content/70 font-medium">
                Mascota actual
              </span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">
                  {selectedPet.name}
                </span>
                {selectedPet.type === "Perro" ? (
                  <Dog size={20} className="text-primary" />
                ) : (
                  <Cat size={20} className="text-primary" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="navbar-end hidden lg:flex">
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/history"
            className={`btn btn-ghost flex items-center gap-2 hover:bg-primary/10 transition-colors duration-200 ${
              isHistoryPage ? "bg-primary/20 text-primary" : ""
            }`}
          >
            <History size={20} />
            <span>Historial</span>
          </Link>
          <div className="divider divider-horizontal mx-2"></div>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 rounded-full border-2 border-primary/20 hover:border-primary transition-colors duration-200",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>

      {/* Botón menú móvil */}
      <div className="navbar-end lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="btn btn-ghost btn-square hover:bg-primary/10 transition-colors duration-200"
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-base-100 shadow-lg border-b border-base-200 lg:hidden">
          <div className="p-4 space-y-4">
            {/* Mascota actual - Mobile */}
            {!isHistoryPage && selectedPet && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-base-content/70">
                  Mascota actual
                </h3>
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                  {selectedPet.type === "Perro" ? (
                    <Dog size={20} className="text-primary" />
                  ) : (
                    <Cat size={20} className="text-primary" />
                  )}
                  <span className="font-medium">{selectedPet.name}</span>
                </div>
                <p className="text-xs text-base-content/60">
                  Ve al dashboard para gestionar tus mascotas
                </p>
              </div>
            )}

            {!isHistoryPage && selectedPet && (
              <div className="divider my-2"></div>
            )}

            {/* Navegación - Mobile */}
            <div className="space-y-2">
              <Link
                href="/dashboard/history"
                onClick={closeMobileMenu}
                className={`w-full btn btn-ghost justify-start gap-3 ${
                  isHistoryPage ? "bg-primary/20 text-primary" : ""
                }`}
              >
                <History size={20} />
                Historial
              </Link>
            </div>

            <div className="divider my-2"></div>

            {/* Usuario - Mobile */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-base-content/70">Usuario</span>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-10 h-10 rounded-full border-2 border-primary/20",
                    },
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PetNavbar;
