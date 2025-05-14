"use client";

import React from 'react';
import { useDiets } from '../hooks/useDiets';
import { useAppSelector } from '../libs/hooks';

function DietsPanel() {
  const selectedPet = useAppSelector((state) => state.pet.selectedPet);
  const { diets, isLoading, error } = useDiets();

  if (!selectedPet) {
    return (
      <div className="card w-96 h-171 shadow-sm bg-white border border-gray-300 relative z-10 p-4">
        <h2 className="text-lg font-bold">Diets Panel</h2>
        <p className="text-gray-500 mt-2">Seleccionar</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="card w-96 h-171 shadow-sm bg-white border border-gray-300 relative z-10 p-4">
        <h2 className="text-lg font-bold">Diets Panel</h2>
        <p className="text-gray-500 mt-2">Cargando dietas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card w-96 h-171 shadow-sm bg-white border border-gray-300 relative z-10 p-4">
        <h2 className="text-lg font-bold">Diets Panel</h2>
        <p className="text-red-500 mt-2">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="card w-96 min-h-171 shadow-sm bg-white border border-gray-300 relative z-10 p-4">
      <h2 className="text-lg font-bold">Dietas de {selectedPet.name}</h2>
      
      {diets && diets.length > 0 ? (
        <div className="mt-3 space-y-4">
          {diets.map((diet) => (
            <div key={diet.id} className="border rounded p-3">
              <h3 className="font-semibold">{diet.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{diet.description}</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Calorias:</span> {diet.calorie_intake}
                </div>
                <div>
                  <span className="font-medium">Cantidad diaria:</span> {diet.grams}g
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-2">No hay dietas disponibles</p>
      )}
    </div>
  )
}

export default DietsPanel