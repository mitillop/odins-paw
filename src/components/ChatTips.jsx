'use client';

import { HeartPulse, BrainCircuit } from "lucide-react";
import Chat from "./Chat";
import { useDiets } from "../hooks/useDiets";
import { usePets } from "../hooks/usePets";
import { useSelector } from "react-redux";

function ChatTips() {
  const selectedPet = useSelector((state) => state.pet.selectedPet);
  const selectedDiet = useSelector((state) => state.pet.selectedDiet);
  const { diets } = useDiets();
  const { pets } = usePets();
  
  if (!pets || pets.length === 0) {
    return (
      <div className="card w-96 bg-white shadow-xl h-[500px] flex flex-col border border-base-200 gap-5">
        <div className="absolute inset-0 flex items-center justify-center gap-5">
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
      <div className="card w-96 bg-white shadow-xl h-[500px] flex flex-col border border-base-200 gap-5">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-17 h-17 bg-base-200 rounded-full flex items-center justify-center mb-4 mx-auto">
              <BrainCircuit size={26} className="text-base-content/70" />
            </div>
            <h3 className="text-lg font-semibold text-base-content/70 mb-2">
              Ninguna mascota seleccionada
            </h3>
            <p className="text-base-content/50 text-sm">
              Selecciona una mascota para recibir consejos de cuidado
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Chat 
      title="Chat de Cuidados"
      icon={HeartPulse}
      messageExample={`Hola, estoy aqui para ayudarte con los cuidados de ${selectedPet.name}. Preguntame lo que necesites.`}
      placeholder="Preguntame lo que necesites."
      borderColor="border-rose-500"
      bubbleColorStart="bg-rose-100"
      bubbleColorEnd="bg-rose-500/30"
      iconColor="text-rose-500"
      headerColor="bg-rose-50"
      apiEndpoint="/api/chat/tips"
      selectedPet={selectedPet}
      selectedDiet={selectedDiet}
      diets={diets}
      pets={pets}
    />
  );
}

export default ChatTips;
