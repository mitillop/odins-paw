'use client';

import { HeartPulse } from "lucide-react";
import Chat from "./Chat";
import { useDiets } from "../hooks/useDiets";
import { useSelector } from "react-redux";

function ChatTips() {
  const selectedPet = useSelector((state) => state.pet.selectedPet);
  const selectedDiet = useSelector((state) => state.pet.selectedDiet);
  const { diets } = useDiets();
  
  return (
    <Chat 
      title="Chat de Cuidados"
      icon={HeartPulse}
      borderColor="border-rose-500"
      bubbleColorStart="bg-rose-100"
      bubbleColorEnd="bg-rose-500/30"
      iconColor="text-rose-500"
      headerColor="bg-rose-50"
      apiEndpoint="/api/chat/tips"
      selectedPet={selectedPet}
      selectedDiet={selectedDiet}
      diets={diets}
    />
  );
}

export default ChatTips;
