'use client';

import { Utensils } from "lucide-react";
import Chat from "./Chat";

function ChatNutrition() {
  return (
    <Chat 
      title="Chat de Nutrición"
      icon={Utensils}
      borderColor="border-orange-500"
      bubbleColorStart="bg-orange-100"
      bubbleColorEnd="bg-orange-500"
      iconColor="text-orange-500"
      headerColor="bg-orange-50"
      apiEndpoint="/api/chat/nutrition"
    />
  );
}

export default ChatNutrition;