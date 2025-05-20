import React from "react";
import { HeartPulse } from "lucide-react";

function ChatTips() {  return (
    <div className="card w-96 bg-white shadow-xl h-[500px] flex flex-col">
      <div className="bg-rose-50 p-4 rounded-t-lg rounded-b-md flex items-center border-t-4 border-rose-500">
        <HeartPulse className="mr-2 text-rose-500" />
        <span className="font-semibold">Chat de Cuidados</span>
      </div>
      
      <div className="card-body p-4 overflow-y-auto flex-grow">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Avatar de veterinario"
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              />
            </div>
          </div>
          <div className="chat-header text-xs">
            Veterinario
            <time className="text-xs opacity-50 ml-2">11:20</time>
          </div>
          <div className="chat-bubble bg-rose-100 text-gray-800">¡Hola! Estoy aquí para responder tus dudas sobre el cuidado y la salud de tu mascota.</div>
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
            <time className="text-xs opacity-50 ml-2">11:22</time>
          </div>
          <div className="chat-bubble bg-rose-500 text-white">¿Cada cuánto tiempo debo desparasitar a mi gato?</div>
        </div>
        
      </div>
      
      <div className="p-3 border-t flex">
        <input 
          type="text" 
          placeholder="Escribe tu mensaje aquí..."          className="input input-bordered w-full mr-2" 
        />
        <button className="btn border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white">Enviar</button>
      </div>
    </div>
  );
}

export default ChatTips;
