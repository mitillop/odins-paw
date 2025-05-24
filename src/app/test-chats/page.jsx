'use client';

import ChatGeneral from '../../components/ChatGeneral';
import ChatNutrition from '../../components/ChatNutrition';
import ChatTips from '../../components/ChatTips';
import TestChat from '../../components/TestChat';
import DebugChat from '../../components/DebugChat';
import ModelStatus from '../../components/ModelStatus';

export default function TestChatsPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Test de Chats</h1>
      
      <div className="mb-8">
        <ModelStatus />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Chat General</h2>
          <ChatGeneral />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Chat Nutrición</h2>
          <ChatNutrition />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Chat Cuidados</h2>
          <ChatTips />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Test Chat (No Streaming)</h2>
          <TestChat />
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Debug Chats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Debug Chat General (gpt-4.1)</h3>
            <DebugChat title="Debug General" apiEndpoint="/api/chat/general" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Debug Chat Nutrición (gpt-4o)</h3>
            <DebugChat title="Debug Nutrición" apiEndpoint="/api/chat/nutrition" />
          </div>
        </div>
      </div>
    </div>
  );
}
