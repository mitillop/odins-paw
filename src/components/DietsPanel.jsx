"use client";

import React from "react";
import { useDiets } from "../hooks/useDiets";
import { usePets } from "../hooks/usePets";
import { useAppSelector, useAppDispatch } from "../libs/hooks";
import { Download, Icon } from "lucide-react";
import { bowlOverflow } from "@lucide/lab";
import DietPDFButton from "./DietPDFButton";
import { selectDiet } from "../libs/features/pet/petSlice";

function DietsPanel() {
  const selectedPet = useAppSelector((state) => state.pet.selectedPet);
  const selectedDiet = useAppSelector((state) => state.pet.selectedDiet);
  const { diets, isLoading, error } = useDiets();
  const { isCreatingDiet, pets } = usePets();
  const dispatch = useAppDispatch();

  const showLoading = isLoading || isCreatingDiet;

  if (!pets || pets.length === 0) {
    return (
      <div className="card w-full bg-white shadow-md">
        <div className="card-body p-6">
          <div className="flex items-center justify-center bg-base-200 p-3 rounded-lg mb-4">
            <h2 className="text-xl font-bold">Dietas</h2>
          </div>
          <div className="text-center py-8">
            <div className="w-17 h-17 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon
                iconNode={bowlOverflow}
                size={30}
                className="text-base-content/70"
              />
            </div>
            <h3 className="font-medium text-base-content/70 mb-2">
              No tienes mascotas registradas
            </h3>
            <p className="text-sm text-base-content/50">
              Agrega tu primera mascota para ver sus dietas aquí
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedPet) {
    return (
      <div className="card w-full bg-white shadow-md">
        <div className="card-body p-6">
          <div className="flex items-center justify-center bg-base-200 p-3 rounded-lg mb-4">
            <h2 className="text-xl font-bold">Dietas</h2>
          </div>
          <div className="text-center py-8">
            <div className="w-17 h-17 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon
                iconNode={bowlOverflow}
                size={30}
                className="text-base-content/70"
              />
            </div>
            <h3 className="font-medium text-base-content/70 mb-2">
              Ninguna mascota seleccionada
            </h3>
            <p className="text-sm text-base-content/50">
              Selecciona una mascota para ver sus dietas
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showLoading) {
    return (
      <div className="card w-full bg-white shadow-md">
        <div className="card-body p-6">
          <div className="flex items-center justify-center bg-base-200 p-3 rounded-lg mb-4">
            <h2 className="text-xl font-bold">Dietas</h2>
          </div>
          <div className="text-center py-8">
            <div className="w-17 h-17 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon
                iconNode={bowlOverflow}
                size={30}
                className="text-base-content/70"
              />
            </div>
            <h3 className="font-medium text-base-content/70 mb-2">
              Regenerando dietas...
            </h3>
            <p className="text-sm text-base-content/50">
              Por favor, espera un momento
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card w-full bg-white shadow-md">
        <div className="card-body p-6">
          <div className="flex items-center justify-center bg-base-200 p-3 rounded-lg mb-4">
            <h2 className="text-xl font-bold">Dietas</h2>
          </div>
          <div className="text-center py-8">
            <p className="text-error">Error al cargar las dietas</p>
          </div>
        </div>
      </div>
    );
  }

  if (!diets || diets.length === 0) {
    return (
      <div className="card w-full bg-white shadow-md">
        <div className="card-body p-6">
          <div className="flex items-center justify-center bg-base-200 p-3 rounded-lg mb-4">
            <h2 className="text-xl font-bold">Dietas</h2>
          </div>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon
                iconNode={bowlOverflow}
                size={24}
                className="text-base-content/40"
              />
            </div>
            <h3 className="font-medium text-base-content/70 mb-2">
              No hay dietas disponibles
            </h3>
            <p className="text-sm text-base-content/50">
              Las dietas aparecerán aquí cuando estén disponibles para{" "}
              {selectedPet.name}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-full bg-white shadow-md">
      <div className="card-body p-6">
        <div className="flex items-center justify-center bg-base-200 p-3 rounded-lg mb-6">
          <h2 className="text-xl font-bold mr-2">
            Dietas de {selectedPet.name}
          </h2>
          <Icon iconNode={bowlOverflow} size={20} className="text-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diets.map((diet) => (
            <div
              key={diet.id}
              className={`card bg-base-100 border cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedDiet?.id === diet.id
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-base-300 hover:border-primary/50"
              }`}
              onClick={() => {
                const serializedDiet = {
                  ...diet,
                  id: String(diet.id),
                  petId: String(diet.petId),
                };
                dispatch(selectDiet(serializedDiet));
              }}
            >
              <div className="card-body p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className={`font-semibold text-lg ${
                      selectedDiet?.id === diet.id
                        ? "text-primary"
                        : "text-base-content"
                    }`}
                  >
                    {diet.name}
                  </h3>
                  {selectedDiet?.id === diet.id && (
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  )}
                </div>

                <p className="text-sm text-base-content/70 mb-4 line-clamp-3">
                  {diet.description}
                </p>

                <div className="flex justify-between items-center">
                  {selectedDiet?.id === diet.id && (
                    <span className="text-xs text-primary font-medium">
                      Seleccionada
                    </span>
                  )}
                  <div className="ml-auto">
                    <DietPDFButton
                      dietInfo={{
                        pet: selectedPet,
                        diet: diet,
                      }}
                      buttonText={<Download size={16} />}
                      className="btn btn-square btn-ghost btn-sm hover:bg-primary/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DietsPanel;
