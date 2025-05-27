"use client";

import { Utensils, BrainCircuit, Dog } from "lucide-react";
import Chat from "./Chat";
import { useDiets } from "../hooks/useDiets";
import { usePets } from "../hooks/usePets";
import { useSelector } from "react-redux";

function ChatNutrition() {
  const selectedPet = useSelector((state) => state.pet.selectedPet);
  const { diets } = useDiets();
  const { pets } = usePets();
  const selectedDiet = useSelector((state) => state.pet.selectedDiet);

  if (!pets || pets.length === 0) {
    return (
      <div className="card w-96 bg-white shadow-xl h-[500px] flex flex-col border border-base-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-17 h-17 bg-base-200 rounded-full flex items-center justify-center mb-4 mx-auto">
              <BrainCircuit size={26} className="text-base-content/70" />
            </div>
            <h3 className="text-lg font-semibold text-base-content/70 mb-2">
              No tienes mascotas registradas
            </h3>
            <p className="text-base-content/50 text-sm">
              Agrega tu primera mascota para comenzar a chatear
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedPet) {
    return (
      <div className="card w-96 bg-white shadow-xl h-[500px] flex flex-col border border-base-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-17 h-17 bg-base-200 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Dog size={26} className="text-base-content/70" />
            </div>
            <h3 className="text-lg font-semibold text-base-content/70 mb-2">
              Ninguna mascota seleccionada
            </h3>
            <p className="text-base-content/50 text-sm">
              Selecciona una mascota para comenzaar a chatear
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Chat
      title="Chat de Nutrición"
      icon={Utensils}
      messageExample={`Hola, estoy aqui para ayudarte con la nutrición de ${selectedPet.name}.`}
      placeholder={`Pregunta sobre la nutrición de ${selectedPet.name}.`}
      borderColor="border-orange-500"
      bubbleColorStart="bg-orange-100"
      bubbleColorEnd="bg-orange-500/30"
      iconColor="text-orange-500"
      headerColor="bg-orange-50"
      apiEndpoint="/api/chat/nutrition"
      selectedPet={selectedPet}
      diets={diets}
      selectedDiet={selectedDiet}
      pets={pets}
    />
  );
}

export default ChatNutrition;
