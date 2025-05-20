import React from "react";
import { Utensils } from "lucide-react";

function ChatNutrition() {  return (
    <div className="card w-96 bg-white shadow-xl h-[500px] flex flex-col">
      <div className="bg-orange-50 p-4 rounded-t-lg rounded-b-md flex items-center border-t-4 border-orange-500">
        <Utensils className="mr-2 text-orange-500" />
        <span className="font-semibold">Chat de Nutrición</span>
      </div>
      
      <div className="card-body p-4 overflow-y-auto flex-grow">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Avatar de nutricionista"
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              />
            </div>
          </div>
          <div className="chat-header text-xs">
            Nutricionista
            <time className="text-xs opacity-50 ml-2">09:30</time>
          </div>
          <div className="chat-bubble bg-orange-100 text-gray-800">¡Bienvenido al chat de nutrición para tu mascota! ¿Qué dudas tienes sobre la alimentación?</div>
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
            <time className="text-xs opacity-50 ml-2">09:32</time>
          </div>
          <div className="chat-bubble bg-orange-500 text-white">Mi perro tiene 3 años, ¿que tipo de premios son mejor a su edad?</div>
        </div>
        
        
      </div>
      
      <div className="p-3 border-t flex">
        <input 
          type="text" 
          placeholder="Escribe tu mensaje aquí..."          className="input input-bordered w-full mr-2" 
        />
        <button className="btn border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">Enviar</button>
      </div>
    </div>
  );
}

export default ChatNutrition;