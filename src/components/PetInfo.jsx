"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "../libs/hooks";

function PetInfo() {
  const dispatch = useAppDispatch();
  const selectedPet = useAppSelector((state) => state.pet.selectedPet);

  if (!selectedPet) {
    return (
      <div className="rounded-xl overflow-hidden p-4 shadow-md relative text-white">
        <p>No hay mascota seleccionada o la información está cargando...</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden shadow-md relative flex flex-col">
      <div className="relative w-full">
        <img
          src={selectedPet.imageUrl}
          alt={selectedPet.name}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-4 text-right">
        <div className="flex items-center justify-end mb-2">
          <h2 className="text-lg font-semibold mr-2">{selectedPet.name}</h2>
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {selectedPet.type}
          </span>
        </div>

        <div className="text-sm space-y-1">
          <p>
            <span className="font-semibold">Sexo:</span>{" "}
            {selectedPet.sex || "-"}
          </p>
          <p>
            <span className="font-semibold">Edad:</span>{" "}
            {selectedPet.age || "-"}
          </p>
          <p>
            <span className="font-semibold">Peso:</span>{" "}
            {selectedPet.weight ? `${selectedPet.weight} kg` : "-"}
          </p>
          <p>
            <span className="font-semibold">Raza:</span>{" "}
            {selectedPet.breed || "-"}
          </p>
          <p>
            <span className="font-semibold">Actividad:</span>{" "}
            {selectedPet.activityLevel || "-"}
          </p>
          <p>
            <span className="font-semibold">Condiciones:</span>{" "}
            {selectedPet.medicalConditions || "-"}
          </p>
        </div>

        <div className="mt-4">
          <button className="w-full py-2 rounded flex items-center justify-center gap-2">
            Editar información
          </button>
        </div>
      </div>
    </div>
  );
}

export default PetInfo;