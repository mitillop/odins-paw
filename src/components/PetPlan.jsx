"use client";

import React from "react";
import { useAppSelector } from "../libs/hooks";
import { useDiets } from "../hooks/useDiets";
import { usePets } from "../hooks/usePets";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import {
  Sunrise,
  Sunset,
  MoonStar,
  Beef,
  Download,
  Cat,
  Dog,
} from "lucide-react";
import DietPDFButton from "./DietPDFButton";

const COLORS = ["#FFBB28", "#FF8042", "#8884D8"];

function PetPlan() {
  const selectedPet = useAppSelector((state) => state.pet.selectedPet);
  const selectedDiet = useAppSelector((state) => state.pet.selectedDiet);
  const { diets, isLoading, error } = useDiets();
  const { pets } = usePets();

  if (!pets || pets.length === 0) {
    return (
      <div className="card w-96 h-171 shadow-sm bg-white border border-gray-300 flex flex-col">
        <div className="card-body p-5 flex flex-col items-center justify-center text-center flex-1 mt-39">
          <div className="w-17 h-17 bg-base-200 rounded-full flex items-center justify-center mb-4">
            <Beef size={30} className="text-base-content/70" />
          </div>
          <h3 className="text-lg font-semibold text-base-content/70 mb-2">
            No tienes mascotas registradas
          </h3>
          <p className="text-base-content/50 text-sm">
            Agrega tu primera mascota para ver su plan nutricional
          </p>
        </div>
      </div>
    );
  }

  if (!selectedPet) {
    return (
      <div className="card w-96 h-171 shadow-sm bg-white border border-gray-300 flex flex-col">
        <div className="card-body p-5 flex flex-col items-center justify-center text-center flex-1 mt-40">
          <div className="w-17 h-17 bg-base-200 rounded-full flex items-center justify-center mb-4">
            <Beef size={30} className="text-base-content/70" />
          </div>
          <h3 className="text-lg font-semibold text-base-content/70 mb-2">
            Ninguna mascota seleccionada
          </h3>
          <p className="text-base-content/50 text-sm">
            Selecciona una mascota para ver su plan nutricional
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex w-96 h-171 flex-col gap-4">
        <div className="skeleton h-60 w-full"></div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-96"></div>
            <div className="skeleton h-4 w-48"></div>
          </div>
        </div>
        <div className="skeleton h-60 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-96 h-171 flex-col gap-4">
        <div className="skeleton h-60 w-full"></div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-96"></div>
            <div className="skeleton h-4 w-48"></div>
          </div>
        </div>
        <div className="skeleton h-60 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );
  }

  if (!diets || diets.length === 0) {
    return (
      <div className="flex w-96 h-171 flex-col gap-4">
        <div className="skeleton h-60 w-full"></div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-96"></div>
            <div className="skeleton h-4 w-48"></div>
          </div>
        </div>
        <div className="skeleton h-60 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );
  }

  return (
    <div className="card w-96 h-171 shadow-sm bg-white border border-gray-300 ">
      {selectedDiet ? (
        <>
          {" "}
          <figure className="w-full h-60 flex items-center justify-center bg-gray-100">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                {selectedDiet.portion_sizes &&
                selectedDiet.portion_sizes.data ? (
                  <Pie
                    data={selectedDiet.portion_sizes.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {selectedDiet.portion_sizes.data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                ) : (
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    No data available
                  </text>
                )}
              </PieChart>
            </ResponsiveContainer>
          </figure>
          <div
            className="card-body p-4 overflow-y-auto"
            style={{ maxHeight: "calc(100% - 15rem)" }}
          >
            {" "}
            <div className="flex items-center justify-center mb-3 bg-neutral p-2 rounded-lg">
              <h2 className="text-xl text-neutral-content font-bold">
                {selectedDiet.name}
              </h2>
            </div>
            <div className="stats stats-vertical shadow h-60 w-full mb-3 text-sm">
              {" "}
              <div className="stat px-3 py-1 mt-1">
                <div className="stat-title text-xs text-primary flex items-center gap-1">
                  <Sunrise size={14} className="text-primary" />
                  Mañana
                  <div
                    className="ml-auto w-3 h-3 rounded-full mt-auto"
                    style={{ backgroundColor: COLORS[0] }}
                  ></div>
                </div>
                <div className="stat-value text-2xl">
                  {selectedDiet.portion_sizes &&
                  selectedDiet.portion_sizes.data &&
                  selectedDiet.portion_sizes.data[0]
                    ? `${selectedDiet.portion_sizes.data[0].value} gramos`
                    : "N/A"}
                </div>
                <div className="text-xs  mt-1">7:00 - 8:00 AM</div>
              </div>{" "}
              <div className="stat px-3 py-1">
                <div className="stat-title text-xs text-primary flex items-center gap-1">
                  <Sunset size={14} className="text-primary" />
                  Tarde
                  <div
                    className="ml-auto w-3 h-3 rounded-full mt-auto"
                    style={{ backgroundColor: COLORS[1] }}
                  ></div>
                </div>
                <div className="stat-value text-2xl">
                  {selectedDiet.portion_sizes &&
                  selectedDiet.portion_sizes.data &&
                  selectedDiet.portion_sizes.data[1]
                    ? `${selectedDiet.portion_sizes.data[1].value} gramos`
                    : "N/A"}
                </div>
                <div className="text-xs mt-1">1:00 - 2:00 PM</div>
              </div>{" "}
              <div className="stat px-3 py-1">
                <div className="stat-title text-xs text-primary flex items-center gap-1">
                  <MoonStar size={14} className="text-primary" />
                  Noche
                  <div
                    className="ml-auto w-3 h-3 rounded-full mt-auto"
                    style={{ backgroundColor: COLORS[2] }}
                  ></div>
                </div>
                <div className="stat-value text-2xl">
                  {selectedDiet.portion_sizes &&
                  selectedDiet.portion_sizes.data &&
                  selectedDiet.portion_sizes.data[2]
                    ? `${selectedDiet.portion_sizes.data[2].value} gramos`
                    : "N/A"}
                </div>
                <div className="text-xs mt-1">7:00 - 8:00 PM</div>
              </div>
            </div>
            <div className="">
              <div className="card bg-base-100 shadow-md h-30">
                <div className="card-body p-3">
                  <h3 className="card-title text-sm font-medium text-primary flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Alimentos recomendados
                  </h3>{" "}
                  <div className="flex flex-wrap gap-2">
                    {selectedDiet.recommended_foods ||
                      "No hay alimentos recomendados"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="p-6 text-center">
          <h2 className="text-lg font-bold">Plato de comida</h2>
          <p className="text-gray-500 mt-4">
            Selecciona una dieta para ver detalles
          </p>
          <div className="flex justify-center mt-4">
            <div className="badge badge-primary">
              Disponible: {diets.length} dietas
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PetPlan;
