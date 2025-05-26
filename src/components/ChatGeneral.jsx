'use client';

import { CircleHelp } from "lucide-react";
import Chat from "./Chat";
import { useDiets } from "../hooks/useDiets";
import { usePets } from "../hooks/usePets";
import { useSelector } from "react-redux";

function ChatGeneral() {
  const { diets } = useDiets();
  const { pets } = usePets();
  const selectedPet = useSelector((state) => state.pet.selectedPet);
  const selectedDiet = useSelector((state) => state.pet.selectedDiet);

  return (
    <Chat 
      title="Chat General"
      icon={CircleHelp}
      borderColor="border-primary"
      messageExample={
        !pets || pets.length === 0 
          ? "Hola, agrega una mascota para comenzar a chatear."
          : !selectedPet 
            ? "Hola, selecciona una mascota para comenzar a chatear."
            : `Hola, estoy aqui para ayudarte con ${selectedPet.name}.`
      }
      placeholder={
        !pets || pets.length === 0 
          ? "Agrega una mascota primero..."
          : !selectedPet 
            ? "Selecciona una mascota primero..."
            : `Pregunta sobre ${selectedPet.name}.`
      }
      bubbleColorStart="bg-blue-100"
      bubbleColorEnd="bg-primary/30"
      iconColor="text-primary"
      headerColor="bg-blue-50"
      apiEndpoint="/api/chat/general"
      selectedPet={selectedPet}
      diets={diets}
      selectedDiet={selectedDiet}
      pets={pets}
    />
  );
}

export default ChatGeneral;
