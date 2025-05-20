import React from "react";
import { CircleHelp } from "lucide-react";

function ChatGeneral() {  return (
    <div className="card w-96 bg-white shadow-xl h-[500px] flex flex-col">
      <div className="bg-gray-50 p-4 rounded-t-lg rounded-b-md flex items-center border-t-4 border-primary">
        <CircleHelp className="mr-2 text-primary" />
        <span className="font-semibold">Chat General</span>
      </div>
      
      <div className="card-body p-4 overflow-y-auto flex-grow">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Avatar de asistente"
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              />
            </div>
          </div>
          <div className="chat-header text-xs">
            Asistente
            <time className="text-xs opacity-50 ml-2">10:15</time>
          </div>
          <div className="chat-bubble bg-blue-100 text-gray-800">¡Hola! ¿En qué puedo ayudarte hoy con tu mascota?</div>
        </div>
        
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Avatar de usuario"
                src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
              />
            </div>
          </div>
          <div className="chat-header text-xs">
            Tú
            <time className="text-xs opacity-50 ml-2">10:16</time>
          </div>
          <div className="chat-bubble bg-primary text-white">Necesito información general sobre el cuidado de mi gato</div>
        </div>
        
      </div>
      
      <div className="p-3 border-t flex">
        <input 
          type="text" 
          placeholder="Escribe tu mensaje aquí..."          className="input input-bordered w-full mr-2" 
        />
        <button className="btn border border-primary text-primary hover:bg-primary hover:text-white">Enviar</button>
      </div>
    </div>
  );
}

export default ChatGeneral;
