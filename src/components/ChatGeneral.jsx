'use client';

import { CircleHelp } from "lucide-react";
import Chat from "./Chat";

function ChatGeneral() {
  return (
    <Chat 
      title="Chat General"
      icon={CircleHelp}
      borderColor="border-primary"
      bubbleColorStart="bg-blue-100"
      bubbleColorEnd="bg-primary"
      iconColor="text-primary"
      headerColor="bg-gray-50"
      apiEndpoint="/api/chat/general"
    />
  );
}

export default ChatGeneral;
