"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "../libs/hooks";
import { Cat, Dog, VenusAndMars, HeartPulse, Weight, Zap, CalendarHeart, Squirrel } from "lucide-react";

function PetInfo() {
  const dispatch = useAppDispatch();
  const selectedPet = useAppSelector((state) => state.pet.selectedPet);

  if (!selectedPet) {
    return null;
  }

  return (
    <div className="card w-96 h-171 shadow-sm mt-5">
      <figure className="w-full h-60">
        {selectedPet.imageUrl ? (
          <img
            src={selectedPet.imageUrl}
            alt={selectedPet.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            {selectedPet.type === "Perro" ? (
              <Dog size={64} className="text-gray-400" />
            ) : (
              <Cat size={64} className="text-gray-400" />
            )}
          </div>
        )}
      </figure>
      <div className="card-body p-4">
        <div className="flex items-center justify-between mb-3 bg-base-200 p-2 rounded-lg">
          <h2 className="text-xl font-bold">{selectedPet.name}</h2>
          <div className="badge badge-secondary flex items-center gap-1">
            {selectedPet.type === "Perro" ? (
              <Dog width={16} height={16} />
            ) : (
              <Cat width={16} height={16} />
            )}
            {selectedPet.type}
          </div>
        </div>
        
        <div className="stats stats-vertical shadow w-full mb-3 text-sm">
          <div className="stat px-3 py-1">
            <div className="stat-title text-xs flex items-center gap-1">
              <VenusAndMars size={14} className="text-primary" /> Sexo
            </div>
            <div className="stat-value text-base">{selectedPet.sex || "-"}</div>
          </div>
          
          <div className="stat px-3 py-1">
            <div className="stat-title text-xs flex items-center gap-1">
              <CalendarHeart size={14} className="text-primary" /> Edad
            </div>
            <div className="stat-value text-base">{selectedPet.age ? `${selectedPet.age} años` : "-"}</div>
          </div>
          
          <div className="stat px-3 py-1">
            <div className="stat-title text-xs flex items-center gap-1">
              <Weight size={14} className="text-primary" /> Peso
            </div>
            <div className="stat-value text-base">{selectedPet.weight ? `${selectedPet.weight} kg` : "-"}</div>
          </div>
          
          <div className="stat px-3 py-1">
            <div className="stat-title text-xs flex items-center gap-1">
              <Squirrel size={14} className="text-primary" /> Raza
            </div>
            <div className="stat-value text-base">{selectedPet.breed || "-"}</div>
          </div>
          
          <div className="stat px-3 py-1">
            <div className="stat-title text-xs flex items-center gap-1">
              <Zap size={14} className="text-primary" /> Nivel de Actividad
            </div>
            <div className="stat-value text-base">{selectedPet.activityLevel || "-"}</div>
          </div>

          <div className="stat px-3 py-1">
            <div className="stat-title text-xs flex items-center gap-1">
              <HeartPulse size={14} className="text-primary" /> Condiciones medicas
            </div>
            <div className="stat-value text-base">{selectedPet.medicalConditions || "Sin condiciones registradas"}</div>
          </div>
        
        </div>
        
        
        <div className="card-actions justify-between">
          <button className="btn btn-primary btn-sm">
            Eliminar
          </button>
          <button className="btn btn-primary btn-sm">
            Editar información
          </button>
        </div>
      </div>
    </div>
  );
}

export default PetInfo;
