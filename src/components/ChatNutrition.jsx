'use client';

import { Utensils } from "lucide-react";
import Chat from "./Chat";
import { useDiets } from "../hooks/useDiets";
import { useSelector } from "react-redux";

function ChatNutrition() {
  const selectedPet = useSelector((state) => state.pet.selectedPet);
  const { diets } = useDiets();
  const selectedDiet = useSelector((state) => state.pet.selectedDiet);

  return (
    <Chat 
      title="Chat de Nutrición"
      icon={Utensils}
      borderColor="border-orange-500"
      bubbleColorStart="bg-orange-100"
      bubbleColorEnd="bg-orange-500/30"
      iconColor="text-orange-500"
      headerColor="bg-orange-50"
      apiEndpoint="/api/chat/nutrition"
      selectedPet={selectedPet}
      diets={diets}
      selectedDiet={selectedDiet}
    />
  );
}

export default ChatNutrition;