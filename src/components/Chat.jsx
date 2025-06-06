'use client';

import { useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { Send, User, BrainCircuit, Loader2 } from 'lucide-react';
import { MemoizedMarkdown } from './memoized-markdown';
import { useChatMutations } from '../hooks/useChatMutations';

export default function Chat({ 
  title, 
  icon: Icon,
  messageExample = "Escribe tu mensaje aquí...",
  placeholder = "Escribe tu mensaje aquí...",
  className = "",
  borderColor = "border-primary",
  bubbleColorStart = "bg-blue-100",
  bubbleColorEnd = "bg-primary",
  iconColor = "text-primary",
  headerColor = "bg-gray-50",
  apiEndpoint = "/api/chat/general",
  selectedPet = null,
  diets = null,
  selectedDiet = null,
  pets = null
}) {
  const { onChatCreated } = useChatMutations();
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: apiEndpoint,
    body: { 
      selectedPet: selectedPet,
      selectedDiet: selectedDiet,
      diets: diets
    },
    onFinish: (message) => {
      console.log('Chat finished with message:', message);
      if (message.role === 'assistant') {
        setTimeout(() => {
          onChatCreated();
        }, 500);
      }
    },
    onError: (error) => {
      console.error('Chat error:', error);
    }
  });
  
  const messagesEndRef = useRef(null);
  const textAreaRef = useRef(null);


  useEffect(() => {
    if (error) {
      console.error('Chat hook error:', error);
    }
  }, [error]);

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
    if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages]);

  return (
    <div className={`card w-96 bg-base-100 shadow-xl h-[500px] flex flex-col ${className} border border-base-200`}>
      <div className={`p-4 rounded-t-lg flex items-center border-t-4 ${borderColor}`}>
        <div className={`flex items-center px-3 py-1 rounded-lg `}>
          <Icon className={`mr-2 ${iconColor}`} />
          <span className="font-semibold">{title}</span>
          {selectedPet && (
            <span className="ml-2 text-xs badge badge-outline badge-sm">
              {selectedPet.name}
            </span>
          )}
        </div>
      </div>
      
      <div className="card-body p-4 overflow-y-auto flex-grow space-y-3">
        {error && (
          <div className="alert alert-error">
            <span>Error: {error.message}</span>
          </div>
        )}
        
        {messages.length === 0 ? (
          <div className="chat chat-start">
            <div className="chat-image p-1 ring-2 ring-primary rounded-full">
              <BrainCircuit className="w-6 h-6 text-primary" />
            </div>
            <div className="chat-header opacity-75 text-xs">
              Asistente
            </div>
            <div className={`chat-bubble ${bubbleColorStart} text-gray-800 shadow-sm`}>
              {messageExample}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`chat ${message.role === 'user' ? 'chat-end' : 'chat-start'}`}>
              <div className={`chat-image p-1 ring-2 ${message.role === 'user' ? 'ring-primary' : 'ring-primary'} rounded-full`}>
                {message.role === 'user' 
                  ? <User className="w-6 h-6 text-primary" /> 
                  : <BrainCircuit className="w-6 h-6 text-primary" />
                }
              </div>
              <div className="chat-header opacity-75 text-xs">
                {message.role === 'user' ? 'Tú' : 'Asistente'}
              </div>
              <div className={`chat-bubble ${
                message.role === 'user' 
                  ? bubbleColorEnd + ' text-black shadow-md' 
                  : bubbleColorStart + ' text-gray-800 shadow-sm'
              }`}>
                {message.content ? (
                  <MemoizedMarkdown id={message.id} content={message.content} />
                ) : (
                  <span className="text-gray-500 italic">Contenido vacío</span>
                )}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="chat chat-start">
            <div className="chat-image p-0.5 ring-2 ring-accent rounded-full">
              <BrainCircuit className="w-6 h-6 text-primary" />
            </div>
            <div className="chat-bubble min-h-8 min-w-12 bg-base-200">
              <span className="loading loading-dots loading-sm"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t flex items-end bg-base-100">
        <div className="relative flex-1 mr-2">
          <textarea 
            ref={textAreaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="textarea textarea-bordered w-full resize-none min-h-10 max-h-32 pr-10"
            rows={1}
            disabled={isLoading}
          />
          {isLoading && (
            <div className="absolute right-3 bottom-3 opacity-70">
              <Loader2 className="animate-spin h-4 w-4" />
            </div>
          )}
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={isLoading || !input.trim()}
          className={`btn btn-circle ${borderColor} ${iconColor} hover:${borderColor.replace('border', 'bg')} hover:text-white`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
