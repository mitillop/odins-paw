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
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={selectedPet.imageUrl}
          alt={selectedPet.name}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {selectedPet.name}
          <div className="badge badge-secondary">{selectedPet.type}</div>
        </h2>
        <div className="space-y-1 text-sm">
          <p><span className="font-semibold">Sexo:</span> {selectedPet.sex || "-"}</p>
          <p><span className="font-semibold">Edad:</span> {selectedPet.age || "-"}</p>
          <p><span className="font-semibold">Peso:</span> {selectedPet.weight ? `${selectedPet.weight} kg` : "-"}</p>
          <p><span className="font-semibold">Raza:</span> {selectedPet.breed || "-"}</p>
          <p><span className="font-semibold">Actividad:</span> {selectedPet.activityLevel || "-"}</p>
          <p><span className="font-semibold">Condiciones:</span> {selectedPet.medicalConditions || "-"}</p>
        </div>
        <div className="card-actions justify-center mt-2">
          <button className="btn btn-primary">Editar información</button>
          <button className="btn btn-primary">Eliminar mascota</button>
        </div>
      </div>
    </div>
  );
}

export default PetInfo;
