'use client';

import { HeartPulse } from "lucide-react";
import Chat from "./Chat";
import { useDiets } from "../hooks/useDiets";
import { usePets } from "../hooks/usePets";
import { useSelector } from "react-redux";

function ChatTips() {
  const selectedPet = useSelector((state) => state.pet.selectedPet);
  const selectedDiet = useSelector((state) => state.pet.selectedDiet);
  const { diets } = useDiets();
  const { pets } = usePets();
  
  return (
    <Chat 
      title="Chat de Cuidados"
      icon={HeartPulse}
      messageExample={
        !pets || pets.length === 0 
          ? "Hola, agrega una mascota para recibir consejos de cuidado."
          : !selectedPet 
            ? "Hola, selecciona una mascota para recibir consejos de cuidado."
            : `Hola, estoy aqui para ayudarte con los cuidados de ${selectedPet.name}. Preguntame lo que necesites.`
      }
      placeholder={
        !pets || pets.length === 0 
          ? "Agrega una mascota primero..."
          : !selectedPet 
            ? "Selecciona una mascota primero..."
            : "Preguntame lo que necesites."
      }
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
