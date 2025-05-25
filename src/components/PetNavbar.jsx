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
  const { pets, isLoading, handleSelectPet, createNewPet, isCreating } =
    usePets();
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
      },
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
        <div className="dropdown dropdown-hover">
          {!isLoading && pets && pets.length > 0 ? (
            <>
              <div
                tabIndex={0}
                role="button"
                className="w-[140px] h-10 text-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-gray-300 cursor-pointer transition-colors duration-200 flex justify-center items-center gap-2"
              >
                {selectedPet ? (
                  <div className="flex items-center gap-1">
                    <span>{selectedPet.name}</span>
                    {selectedPet.type === "Perro" ? (
                      <Dog width={16} height={16} className="text-primary" />
                    ) : (
                      <Cat width={16} height={16} className="text-primary" />
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <CirclePlus width={16} height={16} />
                    <span>Seleccionar</span>
                  </div>
                )}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[140px] mt-1"
              >
                {pets.map((pet) => (
                  <li key={pet.id}>
                    <a
                      onClick={() => handleSelectPet(pet)}
                      className="flex items-center justify-between"
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
                <li>
                  <a onClick={openModal} className="justify-center">
                    <CirclePlus width={16} height={16} />
                    <span>Agregar</span>
                  </a>
                </li>
              </ul>
            </>
          ) : (
            <button
              onClick={openModal}
              className="w-[140px] h-10 btn btn-ghost btn-outline flex hover:border-primary items-center gap-1"
            >
              <CirclePlus width={16} height={16} />
              <span className="truncate">
                {isLoading ? "Cargando..." : "Agregar"}
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="navbar-end z-30">
        <Link
          href="/dashboard/history"
          className="btn btn-ghost flex items-center gap-2 mr-2"
        >
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
            />{" "}
          </div>
        </dialog>
      )}
    </div>
  );
}

export default PetNavbar;
