"use client";

import { Utensils } from "lucide-react";
import Chat from "./Chat";
import { useDiets } from "../hooks/useDiets";
import { usePets } from "../hooks/usePets";
import { useSelector } from "react-redux";

function ChatNutrition() {
  const selectedPet = useSelector((state) => state.pet.selectedPet);
  const { diets } = useDiets();
  const { pets } = usePets();
  const selectedDiet = useSelector((state) => state.pet.selectedDiet);

  return (
    <Chat
      title="Chat de Nutrición"
      icon={Utensils}
      messageExample={
        !pets || pets.length === 0 
          ? "Hola, agrega una mascota para recibir consejos nutricionales."
          : !selectedPet 
            ? "Hola, selecciona una mascota para recibir consejos nutricionales."
            : `Hola, estoy aqui para ayudarte con la nutrición de ${selectedPet.name}.`
      }
      placeholder={
        !pets || pets.length === 0 
          ? "Agrega una mascota primero..."
          : !selectedPet 
            ? "Selecciona una mascota primero..."
            : `Pregunta sobre la nutrición de ${selectedPet.name}.`
      }
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
