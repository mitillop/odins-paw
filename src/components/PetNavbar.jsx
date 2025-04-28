"use client";
import { useEffect, useState } from "react";
import React from "react";
import { useAppSelector, useAppDispatch } from "../libs/hooks";
import { getPets } from "../app/actions/users/getPets";
import { setPet, selectPet } from "../libs/features/pet/petSlice";

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

  const handlePetClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectPet = (pet) => {
    dispatch(selectPet(pet));
    setShowDropdown(false);
  };

  return (
    <div
      className="flex items-center justify-center h-16 w- bg-[var(--accent)] rounded-lg relative"
      onClick={handlePetClick}
    >
      <div className="flex pl-4 pr-4 cursor-pointer hover:bg-gray-300 rounded px-2 py-1 w-full">
        <div className="flex items-center w-full">
          {/* Contenedor de imagen con ancho fijo */}
          <div className="pt-1.5 flex-shrink-0 w-10 h-10">
            {selectedPet && selectedPet.name && selectedPet.imageUrl ? (
              <img
                src={selectedPet.imageUrl}
                alt={selectedPet.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <img
                src={"https://img.icons8.com/?size=50&id=24717&format=png"}
                alt="Agregar mascota"
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
          </div>
          {/* Contenedor de texto con ancho fijo */}
          <div className="w-33 truncate">
            <span>{selectedPet ? selectedPet.name : "Agregar mascota"}</span>
          </div>
        </div>
      </div>

      {showDropdown && !loading && pets && pets.length > 0 && (
        <div className="items-center absolute top-full left-0 right-0 bg-white shadow-md rounded-b-lg z-10 mt-1">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => handleSelectPet(pet)}
            >
              {/* También mostrar imágenes en el dropdown */}
              {pet.imageUrl && (
                <img
                  src={pet.imageUrl}
                  alt={pet.name}
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
              )}
              <span>{pet.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PetNavbar;
