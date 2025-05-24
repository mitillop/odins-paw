'use client';

import { HeartPulse } from "lucide-react";
import Chat from "./Chat";

function ChatTips() {
  return (
    <Chat 
      title="Chat de Cuidados"
      icon={HeartPulse}
      borderColor="border-rose-500"
      bubbleColorStart="bg-rose-100"
      bubbleColorEnd="bg-rose-500"
      iconColor="text-rose-500"
      headerColor="bg-rose-50"
      apiEndpoint="/api/chat/tips"
    />
  );
}

export default ChatTips;
