"use client";
import { useEffect, useState } from "react";
import React from "react";
import { useAppSelector, useAppDispatch } from "../libs/hooks";
import { getPets } from "../app/actions/users/getPets";
import { setPet, selectPet } from "../libs/features/pet/petSlice";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { History } from "lucide-react";
import { PawPrint } from "lucide-react";
import Link from "next/link";
import { CirclePlus, Cat, Dog } from "lucide-react";

function PetNavbar() {
  const dispatch = useAppDispatch();
  const selectedPet = useAppSelector((state) => state.pet.selectedPet);
  const pets = useAppSelector((state) => state.pet.pets);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    async function fetchPets() {
      const petsData = await getPets();
      dispatch(setPet(petsData));
      setLoading(false);
    }
    fetchPets();
  }, [dispatch]);

  const handleSelectPet = (pet) => {
    dispatch(selectPet(pet));
  };

  return (
    <div className="navbar pb bg-base-100 shadow-sm mb-5">
      <div className="navbar-start justify-left">
        <Link href="/dashboard" className="btn btn-ghost text-xl">
          {" "}
          <PawPrint />
          Odin's Paw{" "}
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary className="w-[140px] text-center overflow-hidden text-ellipsis whitespace-nowrap  rounded-lg border border-gray-300 cursor-pointer transition-colors duration-200 flex justify-center items-center gap-2">
                {!loading && pets && pets.length > 0 ? (
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
                    <span>Agregar</span>
                  </div>
                )}
              </summary>
              <ul className="bg-base-100 rounded-md shadow-lg mt-2 p-2 w-[140px] border border-gray-300">
                {!loading && pets && pets.length > 0 ? (
                  <>
                    {pets.map((pet) => (
                      <li key={pet.id}>
                        <a
                          onClick={() => handleSelectPet(pet)}
                          className="flex items-center justify-between  rounded-md py-2 px-3 transition-colors duration-200"
                        >
                          <span className="truncate">{pet.name}</span>
                          {pet.type === "Perro" ? (
                            <Dog
                              width={16}
                              height={16}
                              className="text-primary"
                            />
                          ) : (
                            <Cat
                              width={16}
                              height={16}
                              className="text-primary"
                            />
                          )}
                        </a>
                      </li>
                    ))}
                    <li className="mt-1">
                      <div className="flex items-center justify-center gap-1 hover:bg-secondary hover:text-white rounded-md py-2 px-3 transition-colors duration-200 cursor-pointer">
                        <CirclePlus width={16} height={16} />
                        <span>Agregar</span>
                      </div>
                    </li>
                  </>
                ) : (
                  <li>
                    <a className="hover:bg-primary hover:text-white rounded-md py-2 px-3 transition-colors duration-200 text-center">
                      No tienes mascotas
                    </a>
                  </li>
                )}
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link href="/dashboard/history" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <History />
          </div>
        </Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default PetNavbar;
