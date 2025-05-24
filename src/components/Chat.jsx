'use client';

import { useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { Send, User, Bot } from 'lucide-react';
import { MemoizedMarkdown } from './memoized-markdown';

export default function Chat({ 
  title, 
  icon: Icon,
  className = "",
  borderColor = "border-primary",
  bubbleColorStart = "bg-blue-100",
  bubbleColorEnd = "bg-primary",
  iconColor = "text-primary",
  headerColor = "bg-gray-50",
  apiEndpoint = "/api/chat/general"
}) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: apiEndpoint
  });
  const messagesEndRef = useRef(null);
  const textAreaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e) => {
    handleInputChange(e);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`card w-96 bg-white shadow-xl h-[500px] flex flex-col ${className}`}>
      <div className={`${headerColor} p-4 rounded-t-lg rounded-b-md flex items-center border-t-4 ${borderColor}`}>
        <Icon className={`mr-2 ${iconColor}`} />
        <span className="font-semibold">{title}</span>
      </div>
      
      <div className="card-body p-4 overflow-y-auto flex-grow">
        {messages.length === 0 ? (
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
              <time className="text-xs opacity-50 ml-2">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</time>
            </div>
            <div className={`chat-bubble ${bubbleColorStart} text-gray-800`}>¡Hola! ¿En qué puedo ayudarte hoy?</div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`chat ${message.role === 'user' ? 'chat-end' : 'chat-start'}`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt={message.role === 'user' ? "Avatar de usuario" : "Avatar de asistente"}
                    src={message.role === 'user' 
                      ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp" 
                      : "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"}
                  />
                </div>
              </div>
              <div className="chat-header text-xs">
                {message.role === 'user' ? 'Tú' : 'Asistente'}
                <time className="text-xs opacity-50 ml-2">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</time>
              </div>
              <div className={`chat-bubble ${message.role === 'user' ? bubbleColorEnd + ' text-white' : bubbleColorStart + ' text-gray-800'}`}>
                <MemoizedMarkdown id={message.id} content={message.content} />
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t flex">
        <textarea 
          ref={textAreaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje aquí..."
          className="textarea textarea-bordered w-full mr-2 resize-none min-h-10 max-h-32"
          rows={1}
          disabled={isLoading}
        />
        <button 
          onClick={handleSubmit} 
          disabled={isLoading || !input.trim()}
          className={`btn border ${borderColor} ${iconColor} hover:${borderColor.replace('border', 'bg')} hover:text-white`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
