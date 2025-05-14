"use client";

import React from "react";
import { useAppSelector } from "../libs/hooks";
import { useDiets } from "../hooks/useDiets";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

// Define the COLORS array
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
    <div className="card w-96 h-171 shadow-sm bg-white border border-gray-300 relative z-10 p-4">
      <h2 className="text-lg font-bold">Plato de comida</h2>
      {diets && diets.length > 0 ? (
        <>
          <h2>{diets[0].name}</h2>
          <PieChart width={800} height={400}>
            <Pie
              data={diets[0].portion_sizes.data}
              cx={120}
              cy={200}
              innerRadius={60}
              outerRadius={80}
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
          <p>Gramos al dia: {diets[0].grams}</p>
          <p>Mañana: {diets[0].portion_sizes.data[0].value}</p>
          <p>Tarde: {diets[0].portion_sizes.data[0].value}</p>
          <p>Mañana: {diets[0].portion_sizes.data[0].value}</p>

        </>
      ) : (
        <p className="text-gray-500 mt-2">No hay dietas disponibles</p>
      )}
    </div>
  );
}

export default PetPlan;
