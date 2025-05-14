"use client";

import React from "react";
import { useAppSelector } from "../libs/hooks";
import { useDiets } from "../hooks/useDiets";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { Sunrise } from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

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
                  label={({ name }) => `${name}`}
                >
                  {diets[0].portion_sizes.data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        diets[0].portion_sizes.colors?.[index] ||
                        COLORS[index % COLORS.length]
                      }
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </figure>
          <div className="flex items-center justify-between mb-3 bg-base-200 p-2 rounded-lg">
            <div className="badge badge-secondary flex items-center gap-1"></div>
          </div>
          <div className="card-body p-4">
            <div className="stats stats-vertical shadow">
              <div className="stat">
                <div className="stat-title flex items-center">
                  Mañana
                  <span className="ml-2">
                    <Sunrise />
                  </span>
                </div>
                <div className="stat-value">
                  {diets[0].portion_sizes.data[0].value} gramos
                </div>
                <div className="stat-desc">Jan 1st - Feb 1st</div>
              </div>

              <div className="stat">
                <div className="stat-title">New Users</div>
                <div className="stat-value">4,200</div>
                <div className="stat-desc">↗︎ 400 (22%)</div>
              </div>

              <div className="stat">
                <div className="stat-title">New Registers</div>
                <div className="stat-value">1,200</div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
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
