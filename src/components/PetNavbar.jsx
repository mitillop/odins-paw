"use client";
import { useEffect, useState } from "react";
import React from "react";
import { useAppSelector, useAppDispatch } from "../libs/hooks";
import { getPets } from "../app/actions/users/getPets";
import { setPet, selectPet } from "../libs/features/pet/petSlice";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { History } from "lucide-react";

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
    setShowDropdown(false);
  };
  
  return (
    <div className="navbar pb bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Odin's Paw</a>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>
                {!loading && pets && pets.length > 0 
                  ? pets[0].name 
                  : "Mascotas"}
              </summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                {!loading && pets && pets.length > 0 ? (
                  pets.map((pet) => (
                    <li key={pet.id}>
                      <a onClick={() => handleSelectPet(pet)} className="flex items-center">
                        <span>{pet.name}</span>
                      </a>
                    </li>
                  ))
                ) : (
                  <li><a>No tienes mascotas</a></li>
                )}
                {loading && (
                  <li><a>Cargando...</a></li>
                )}
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <History />
          </div>
        </button>
        <SignedIn />
      </div>
    </div>
  );
}

export default PetNavbar;
