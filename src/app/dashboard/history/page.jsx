'use client'

import { useState } from 'react'
import { useChatHistory } from '../../../hooks/useChatHistory'
import ChatHistoryFilters from '../../../components/ChatHistoryFilters'
import ChatHistoryItem from '../../../components/ChatHistoryItem'
import { Trash2, RefreshCw } from 'lucide-react'

export default function History() {
  const {
    history,
    pets,
    isLoading,
    error,
    selectedCategory,
    handleCategoryFilter,
    clearFilters,
    refreshHistory,
    hasHistory,
    filteredCount,
    handleDeleteChat,
    handleClearAllChats,
    isDeleting,
    isClearing,
    deleteError,
    clearError
  } = useChatHistory()

  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleDeleteSingleChat = (chatId) => {
    handleDeleteChat(chatId, {
      onSuccess: () => {
        console.log('Conversación eliminada exitosamente');
      },
      onError: (error) => {
        console.error('Error al eliminar conversación:', error);
      }
    });
  };

  const handleClearAll = () => {
    handleClearAllChats({
      onSuccess: (result) => {
        setShowClearConfirm(false);
        console.log(result.message);
      },
      onError: (error) => {
        setShowClearConfirm(false);
        console.error('Error al limpiar historial:', error);
      }
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshHistory();
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 300);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-medium">Error al cargar el historial</p>
          <p className="text-sm">{error.message || 'Error desconocido'}</p>
          <button 
            onClick={refreshHistory}
            className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Historial de Conversaciones</h1>
        <div className="flex gap-2">
          {selectedCategory && (
            <button
              onClick={clearFilters}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
            >
              Limpiar filtros
            </button>
          )}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <RefreshCw 
              size={14} 
              className={`${isRefreshing ? 'animate-spin' : ''}`}
            />
            {isRefreshing ? 'Actualizando...' : 'Actualizar'}
          </button>
          {hasHistory && (
            <button
              onClick={() => setShowClearConfirm(true)}
              disabled={isClearing}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              {isClearing ? (
                <>
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                  Limpiando...
                </>
              ) : (
                <>
                  <Trash2 size={14} />
                  Limpiar todo
                </>
              )}
            </button>
          )}
        </div>
      </div>
      
      <ChatHistoryFilters 
        onCategoryChange={handleCategoryFilter}
        selectedCategory={selectedCategory}
      />
      
      {selectedCategory && (
        <div className="mb-4 text-sm text-gray-600">
          Mostrando {filteredCount} conversación(es) 
          {selectedCategory && ` de categoría "${selectedCategory}"`}
        </div>
      )}

      {/* Mostrar errores de mutaciones */}
      {deleteError && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="text-sm">Error al eliminar: {deleteError.message}</p>
        </div>
      )}

      {clearError && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="text-sm">Error al limpiar historial: {clearError.message}</p>
        </div>
      )}
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="text-gray-500 mt-2">Cargando conversaciones...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {hasHistory ? (
            history.map((chat) => (
              <ChatHistoryItem 
                key={chat.id} 
                chat={chat} 
                onDelete={handleDeleteSingleChat}
                isDeleting={isDeleting}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                {selectedCategory 
                  ? `No hay conversaciones de la categoría seleccionada`
                  : `No hay conversaciones en el historial`
                }
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modal de confirmación para limpiar todo */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-bold mb-4">Confirmar eliminación</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que quieres eliminar todo el historial de conversaciones? 
              Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowClearConfirm(false)}
                disabled={isClearing}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleClearAll}
                disabled={isClearing}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2"
              >
                {isClearing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Eliminando...
                  </>
                ) : (
                  'Eliminar todo'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}