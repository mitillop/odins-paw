"use client";

import React from "react";
import { useDiets } from "../hooks/useDiets";
import { useAppSelector } from "../libs/hooks";
import { Download, Icon } from "lucide-react";
import { bowlOverflow } from "@lucide/lab";
import DietPDFButton from "./DietPDFButton";

function DietsPanel() {
  const selectedPet = useAppSelector((state) => state.pet.selectedPet);
  const { diets, isLoading, error } = useDiets();

  if (!selectedPet) {
    return (
      <div className="card bg-base-100 shadow-md w-96">
        <div className="card-body">
          <h2 className="card-title">Diets Panel</h2>
          <p className="text-base-content/70">Seleccionar</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="card bg-base-100 shadow-md w-96">
        <div className="card-body">
          <h2 className="card-title">Diets Panel</h2>
          <p className="text-base-content/70">Cargando dietas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-base-100 shadow-md w-96">
        <div className="card-body">
          <h2 className="card-title">Diets Panel</h2>
          <p className="text-error">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-96 h-171 bg-white shadow-md">
      <div
        className="card-body p-4 overflow-y-auto"
        style={{ maxHeight: "100%" }}
      >
        <div className="flex items-center justify-center  mb-3 bg-base-200 p-2 rounded-lg">
          <h2 className="text-xl font-bold mr-2">Dietas </h2>
          <div className="flex items-center gap-1">
            <Icon iconNode={bowlOverflow} />
          </div>
        </div>
        {diets && diets.length > 0 ? (
          <ul className="list bg-base-100 rounded-box p-2 gap-2 tracking-wide">
            {diets.map((diet) => (
              <li key={diet.id} className="list-row">
                <div className="text-primary">{diet.name}</div>
                <p className="list-col-wrap text-xs">{diet.description}</p>{" "}
                <DietPDFButton
                  dietInfo={{
                    pet: selectedPet,
                    diet: diet,
                  }}
                  buttonText={<Download size={16} />}
                  className="btn list-col-wrap btn-square btn-ghost"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="alert alert-info">
            <span>No hay dietas disponibles</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default DietsPanel;
