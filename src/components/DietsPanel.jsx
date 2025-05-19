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
  const { isCreatingDiet } = usePets();
  const dispatch = useAppDispatch();

  const showLoading = isLoading || isCreatingDiet;

  if (!selectedPet) {
    return (
      <div className="flex w-96 h-171 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-96"></div>
            <div className="skeleton h-4 w-48"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );
  }

  if (showLoading) {
    return (
      <div className="flex w-96 h-171 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-96"></div>
            <div className="skeleton h-4 w-48"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-96 h-171 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-96"></div>
            <div className="skeleton h-4 w-48"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );
  }
  
  if (!diets || diets.length === 0) {
    return (
      <div className="flex w-96 h-171 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-96"></div>
            <div className="skeleton h-4 w-48"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );
  }

  return (
    <div className="card w-96 h-171 bg-white shadow-md">
      <div
        className="card-body p-4 overflow-y-auto"
        style={{ maxHeight: "100%" }}
      >
        <div className="flex items-center justify-center bg-base-200 p-2 rounded-lg">
          <h2 className="text-xl font-bold mr-2">Dietas </h2>
          <div className="flex items-center gap-1">
            <Icon iconNode={bowlOverflow} />
          </div>
        </div>{" "}
        <ul className="list bg-white rounded-box p-2 gap-2 tracking-wide">
          {diets.map((diet) => (
            <li
              key={diet.id}
              className={`list-row cursor-pointer transition-colors duration-200 ${
                selectedDiet?.id === diet.id ? "bg-primary/10 rounded" : ""
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
              <div
                className={`${
                  selectedDiet?.id === diet.id
                    ? "text-primary font-medium"
                    : "text-primary"
                }`}
              >
                {diet.name}
              </div>
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
      </div>
    </div>
  );
}

export default DietsPanel;
