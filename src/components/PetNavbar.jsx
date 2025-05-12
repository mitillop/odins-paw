"use client";
import { useEffect, useState } from "react";
import React from "react";
import { useAppSelector } from "../libs/hooks";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { History, PawPrint, CirclePlus, Cat, Dog } from "lucide-react";
import Link from "next/link";
import { usePets } from "../hooks/usePets";
import PetForm from "./PetForm";

function PetNavbar() {
  const selectedPet = useAppSelector((state) => state.pet.selectedPet);
  const { pets, isLoading, handleSelectPet, createNewPet, isCreating } = usePets();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!selectedPet && !isLoading && pets && pets.length > 0) {
      handleSelectPet(pets[0]);
    }
  }, [selectedPet, pets, isLoading, handleSelectPet]);

  const handleCreatePet = (petData) => {
    createNewPet(petData, {
      onSuccess: () => {
        closeModal();
      }
    });
  };

  return (
    <div className="navbar pb bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-30">
      <div className="navbar-start justify-left">
        <Link href="/dashboard" className="btn btn-ghost text-xl">
          <PawPrint />
          Odin's Paw
        </Link>
      </div>
      
      <div className="navbar-center z-30">
        <ul className="menu menu-horizontal px-1">
          <li className="relative">
            {!isLoading && pets && pets.length > 0 ? (
              <details className="dropdown">
                <summary className="w-[140px] h-10 text-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-gray-300 cursor-pointer transition-colors duration-200 flex justify-center items-center gap-2">
                  {selectedPet ? (
                    <div className="flex items-center gap-1">
                      {selectedPet.type === "Perro" ? (
                        <Dog width={16} height={16} className="text-primary" />
                      ) : (
                        <Cat width={16} height={16} className="text-primary" />
                      )}
                      <span>{selectedPet.name}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <CirclePlus width={16} height={16} />
                      <span>Seleccionar</span>
                    </div>
                  )}
                </summary>
                <ul className="bg-base-100 rounded-md shadow-lg mt-2 p-2 w-[140px] border border-gray-300 z-50 relative dropdown-content">
                  {pets.map((pet) => (
                    <li key={pet.id}>
                      <a
                        onClick={() => handleSelectPet(pet)}
                        className="flex items-center justify-between rounded-md py-2 px-3 transition-colors duration-200"
                      >
                        <span className="truncate">{pet.name}</span>
                        {pet.type === "Perro" ? (
                          <Dog width={16} height={16} className="text-primary" />
                        ) : (
                          <Cat width={16} height={16} className="text-primary" />
                        )}
                      </a>
                    </li>
                  ))}
                  <li className="">
                    <button
                      onClick={openModal}
                      className="flex w-full items-center justify-center gap-1 hover:bg-secondary hover:text-white rounded-md px-3 transition-colors duration-200 cursor-pointer"
                    >
                      <CirclePlus width={16} height={16} />
                      <span>Agregar</span>
                    </button>
                  </li>
                </ul>
              </details>
            ) : (
              <button
                onClick={openModal}
                className="w-[140px] h-10 btn btn-ghost btn-outline flex hover:border-primary items-center gap-1"
              >
                <CirclePlus width={16} height={16} />
                <span className="truncate">{isLoading ? "Cargando..." : "Agregar"}</span>
              </button>
            )}
          </li>
        </ul>
      </div>
      
      <div className="navbar-end z-30">
        <Link href="/dashboard/history" className="btn btn-ghost flex items-center gap-2 mr-2">
          <History size={20} />
          <span className="pb-1">Historial</span>
        </Link>
        <SignedIn>
          <UserButton className="mr-2" />
        </SignedIn>
      </div>

      {isModalOpen && (
        <dialog
          className="modal modal-open justify-center items-center"
          onClick={(e) => {
            if (e.target.classList.contains("modal")) {
              closeModal();
            }
          }}
        >
          <div className="modal-box p-4 max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Registrar mascota</h3>
              <button 
                onClick={closeModal} 
                className="btn btn-sm btn-circle btn-ghost"
                disabled={isCreating}
              >
                ✕
              </button>
            </div>
            <PetForm 
              onClose={closeModal} 
              onSubmit={handleCreatePet}
              isSubmitting={isCreating} 
            />
          </div>
        </dialog>
      )}
    </div>
  );
}

export default PetNavbar;
