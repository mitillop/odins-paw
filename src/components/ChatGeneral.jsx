'use client';

import { CircleHelp } from "lucide-react";
import Chat from "./Chat";
import { useDiets } from "../hooks/useDiets";
import { useSelector } from "react-redux";

function ChatGeneral() {
  const { diets } = useDiets();
  const selectedPet = useSelector((state) => state.pet.selectedPet);
  const selectedDiet = useSelector((state) => state.pet.selectedDiet);

  return (
    <Chat 
      title="Chat General"
      icon={CircleHelp}
      borderColor="border-primary"
      bubbleColorStart="bg-blue-100"
      bubbleColorEnd="bg-primary/30"
      iconColor="text-primary"
      headerColor="bg-blue-50"
      apiEndpoint="/api/chat/general"
      selectedPet={selectedPet}
      diets={diets}
      selectedDiet={selectedDiet}
    />
  );
}

export default ChatGeneral;
