'use client';

import { useRef, useEffect, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Send } from 'lucide-react';

export default function DebugChat({ 
  title = "Debug Chat",
  apiEndpoint = "/api/chat/general"
}) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: apiEndpoint
  });
  const messagesEndRef = useRef(null);
  const textAreaRef = useRef(null);
  const [messagesLog, setMessagesLog] = useState([]);

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
    
    // Log message details when messages change
    if (messages.length > messagesLog.length) {
      const newMessage = messages[messages.length - 1];
      console.log('New message received:', newMessage);
      setMessagesLog(prev => [...prev, {
        id: newMessage.id,
        role: newMessage.role,
        content: newMessage.content,
        timestamp: new Date().toISOString()
      }]);
    }
  }, [messages, messagesLog]);

  return (
    <div className="card w-full bg-white shadow-xl h-[700px] flex flex-col">
      <div className="bg-yellow-50 p-4 rounded-t-lg rounded-b-md flex items-center border-t-4 border-yellow-500">
        <span className="font-semibold">{title} - {apiEndpoint}</span>
      </div>
      
      <div className="card-body p-4 overflow-y-auto flex-grow">
        {messages.length === 0 ? (
          <div className="alert alert-info">
            <span>No hay mensajes. Envía un mensaje para iniciar la conversación.</span>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="mb-4 p-3 border rounded">
              <div className="font-semibold text-sm">
                Role: {message.role} | ID: {message.id}
              </div>
              <div className="mt-2 p-2 bg-gray-100 rounded whitespace-pre-wrap">
                {message.content || '(Contenido vacío)'}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Tipo: {typeof message.content} | Longitud: {message.content ? message.content.length : 0}
              </div>
            </div>
          ))
        )}
        
        {error && (
          <div className="alert alert-error my-4">
            <span>Error: {error.message || JSON.stringify(error)}</span>
          </div>
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
          className="btn border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-3 border-t bg-gray-50">
        <h3 className="font-semibold mb-2">Información de depuración</h3>
        <div className="text-xs">
          <p>Endpoint: {apiEndpoint}</p>
          <p>Mensajes totales: {messages.length}</p>
          <p>Estado de carga: {isLoading ? 'Cargando...' : 'Listo'}</p>
          {error && <p className="text-red-500">Error: {error.message || JSON.stringify(error)}</p>}
        </div>
      </div>
    </div>
  );
}
