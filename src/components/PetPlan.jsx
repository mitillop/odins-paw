"use client";

import React from "react";
import { useAppSelector } from "../libs/hooks";
import { useDiets } from "../hooks/useDiets";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { Sunrise, Sunset, MoonStar, Beef } from "lucide-react";

const COLORS = ["#FFBB28", "#FF8042", "#8884D8"];

function PetPlan() {
  const selectedPet = useAppSelector((state) => state.pet.selectedPet);
  const { diets, isLoading, error } = useDiets();

  if (!selectedPet) {
    return (
      <div className="card w-96 h-171 shadow-sm bg-white border border-gray-300 relative z-10 p-4">
        <h2 className="text-lg font-bold">Plato de comida</h2>
        <p className="text-gray-500 mt-2">Seleccionar</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="card w-96 h-171 shadow-sm bg-white border border-gray-300 relative z-10 p-4">
        <h2 className="text-lg font-bold">Plato de comida</h2>
        <p className="text-gray-500 mt-2">Cargando dietas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card w-96 h-171 shadow-sm bg-white border border-gray-300 relative z-10 p-4">
        <h2 className="text-lg font-bold">Plato de comida</h2>
        <p className="text-red-500 mt-2">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="card w-96 h-171 shadow-sm bg-white border border-gray-300 relative z-10">
      {diets && diets.length > 0 ? (
        <>
          <figure className="w-full h-60 flex items-center justify-center bg-gray-100">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diets[0].portion_sizes.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {diets[0].portion_sizes.data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </figure>
          <div className="card-body p-4">
            <div className="flex items-center justify-between mb-3 bg-base-200 p-2 rounded-lg">
              <h2 className="text-xl font-bold">{diets[0].name}</h2>
              <div className="badge badge-secondary flex items-center gap-1">
                {diets[0].grams} gramos
              </div>
            </div>
            <div className="stats stats-vertical shadow w-full mb-3 text-sm">
              <div className="stat px-3 py-1 mt-1">
                <div className="stat-title text-xs text-primary flex items-center gap-1">
                  <Sunrise size={14} className="text-primary" />
                  Mañana
                  <div
                    className="ml-auto w-3 h-3 rounded-full mt-auto"
                    style={{ backgroundColor: COLORS[0] }}
                  ></div>
                </div>
                <div className="stat-value">
                  {diets[0].portion_sizes.data[0].value} gramos
                </div>
                <div className="text-xs  mt-1">7:00 - 8:00 AM</div>
              </div>

              <div className="stat px-3 py-1">
                <div className="stat-title text-xs text-primary flex items-center gap-1">
                  <Sunset size={14} className="text-primary" />
                  Tarde
                  <div
                    className="ml-auto w-3 h-3 rounded-full mt-auto"
                    style={{ backgroundColor: COLORS[1] }}
                  ></div>
                </div>
                <div className="stat-value">
                  {diets[0].portion_sizes.data[1].value} gramos
                </div>
                <div className="text-xs mt-1">1:00 - 2:00 PM</div>
              </div>

              <div className="stat px-3 py-1">
                <div className="stat-title text-xs text-primary flex items-center gap-1">
                  <MoonStar size={14} className="text-primary" />
                  Noche
                  <div
                    className="ml-auto w-3 h-3 rounded-full mt-auto"
                    style={{ backgroundColor: COLORS[2] }}
                  ></div>
                </div>
                <div className="stat-value">
                  {diets[0].portion_sizes.data[2].value} gramos
                </div>
                <div className="text-xs mt-1">7:00 - 8:00 PM</div>
              </div>
            </div>
            <div className="mt-3">
              <div className="card bg-base-100 shadow-md">
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
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {diets[0].recommended_foods}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-500 mt-2 p-4">No hay dietas disponibles</p>
      )}
    </div>
  );
}

export default PetPlan;
