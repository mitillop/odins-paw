'use client';

import { useState } from 'react';

export default function TestChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [userMessage],
        }),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Error al obtener respuesta');
      }

      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: data.response }
      ]);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Error al comunicarse con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card w-96 bg-white shadow-xl h-[500px] flex flex-col">
      <div className="bg-gray-50 p-4 rounded-t-lg rounded-b-md flex items-center border-t-4 border-primary">
        <span className="font-semibold">Test Chat (Modelo: gpt-4.1)</span>
      </div>
      
      <div className="card-body p-4 overflow-y-auto flex-grow">
        {messages.map((message, index) => (
          <div key={index} className={`chat ${message.role === 'user' ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-header text-xs">
              {message.role === 'user' ? 'Tú' : 'Asistente'}
            </div>
            <div className={`chat-bubble ${message.role === 'user' ? 'bg-primary text-white' : 'bg-blue-100 text-gray-800'}`}>
              {message.content}
            </div>
          </div>
        ))}
        
        {error && (
          <div className="alert alert-error my-2">
            <span>{error}</span>
          </div>
        )}
      </div>
      
      <div className="p-3 border-t">
        <form onSubmit={handleSubmit} className="flex">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            className="input input-bordered w-full mr-2"
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="btn border border-primary text-primary hover:bg-primary hover:text-white"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
