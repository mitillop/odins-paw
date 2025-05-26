'use client'

import { useState } from 'react'
import { useChatHistory } from '../../../hooks/useChatHistory'
import ChatHistoryFilters from '../../../components/ChatHistoryFilters'
import ChatHistoryItem from '../../../components/ChatHistoryItem'
import { Trash2, RefreshCw, History, MessageSquare } from 'lucide-react'

export default function HistoryPage() {
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
      <div className="max-w-7xl mx-auto p-4">
        <div className="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-bold">Error al cargar el historial</h3>
              <div className="text-xs">{error.message || 'Error desconocido'}</div>
            </div>
          </div>
          <div className="flex-none">
            <button 
              onClick={refreshHistory}
              className="btn btn-sm btn-outline"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="card bg-base-100 shadow-lg mb-6">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <History className="text-primary" size={24} />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-base-content">
                  Historial de Conversaciones
                </h1>
                <p className="text-base-content/70 text-sm">
                  Revisa todas tus conversaciones anteriores con el asistente
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedCategory && (
                <button
                  onClick={clearFilters}
                  className="btn btn-ghost btn-sm"
                >
                  Limpiar filtros
                </button>
              )}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing || isLoading}
                className="btn btn-primary btn-sm"
              >
                <RefreshCw 
                  size={16} 
                  className={`${isRefreshing ? 'animate-spin' : ''}`}
                />
                {isRefreshing ? 'Actualizando...' : 'Actualizar'}
              </button>
              {hasHistory && (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  disabled={isClearing}
                  className="btn btn-error btn-sm"
                >
                  {isClearing ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Limpiando...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      Limpiar todo
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-6">
        <ChatHistoryFilters 
          onCategoryChange={handleCategoryFilter}
          selectedCategory={selectedCategory}
        />
      </div>
      
      {/* Contador de resultados */}
      {selectedCategory && (
        <div className="alert alert-info mb-6">
          <MessageSquare size={20} />
          <span>
            Mostrando {filteredCount} conversación(es) de categoría "{selectedCategory}"
          </span>
        </div>
      )}

      {/* Alertas de error */}
      {deleteError && (
        <div className="alert alert-error mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error al eliminar: {deleteError.message}</span>
        </div>
      )}

      {clearError && (
        <div className="alert alert-error mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error al limpiar historial: {clearError.message}</span>
        </div>
      )}
      
      {/* Contenido principal */}
      {isLoading ? (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex flex-col items-center justify-center py-12">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="text-base-content/70 mt-4">Cargando conversaciones...</p>
            </div>
          </div>
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
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare size={32} className="text-base-content/40" />
                  </div>
                  <h3 className="text-lg font-semibold text-base-content/70 mb-2">
                    {selectedCategory 
                      ? 'No hay conversaciones de la categoría seleccionada'
                      : 'No hay conversaciones en el historial'
                    }
                  </h3>
                  <p className="text-base-content/50 text-sm">
                    {selectedCategory 
                      ? 'Prueba seleccionando una categoría diferente o limpia los filtros'
                      : 'Comienza una conversación en el dashboard para ver tu historial aquí'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal de confirmación para limpiar todo */}
      {showClearConfirm && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error mb-4">
              Confirmar eliminación
            </h3>
            <p className="text-base-content/70 mb-6">
              ¿Estás seguro de que quieres eliminar todo el historial de conversaciones? 
              Esta acción no se puede deshacer.
            </p>
            <div className="modal-action">
              <button
                onClick={() => setShowClearConfirm(false)}
                disabled={isClearing}
                className="btn btn-ghost"
              >
                Cancelar
              </button>
              <button
                onClick={handleClearAll}
                disabled={isClearing}
                className="btn btn-error"
              >
                {isClearing ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Eliminando...
                  </>
                ) : (
                  'Eliminar todo'
                )}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowClearConfirm(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  )
}