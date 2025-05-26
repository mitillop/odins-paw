"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getChatHistory } from "../app/actions/chat/getChatHistory";
import { deleteChatHistory } from "../app/actions/chat/deleteChatHistory";
import { clearAllChatHistory } from "../app/actions/chat/clearAllChatHistory";
import { useState, useCallback } from "react";

export function useChatHistory() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPetId, setSelectedPetId] = useState(null);
  const queryClient = useQueryClient();

  const {
    data: chatHistoryData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["chatHistory", selectedPetId, selectedCategory],
    queryFn: () => getChatHistory(selectedPetId, selectedCategory || null),
    staleTime: 2 * 60 * 1000, 
    gcTime: 5 * 60 * 1000, 
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (data) => {
      if (data?.success) {
        return {
          history: data.data || [],
          pets: data.pets || [],
          user: data.user
        };
      }
      return { history: [], pets: [], user: null };
    }
  });

  const deleteChatMutation = useMutation({
    mutationFn: deleteChatHistory,
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["chatHistory"] });
      }
    },
    onError: (error) => {
      console.error('Error al eliminar conversación:', error);
    }
  });

  const clearAllChatMutation = useMutation({
    mutationFn: clearAllChatHistory,
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["chatHistory"] });
        queryClient.setQueryData(["chatHistory", selectedPetId, selectedCategory], {
          history: [],
          pets: chatHistoryData?.pets || [],
          user: chatHistoryData?.user
        });
      }
    },
    onError: (error) => {
      console.error('Error al limpiar historial:', error);
    }
  });

  const handleCategoryFilter = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handlePetFilter = useCallback((petId) => {
    setSelectedPetId(petId);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategory('');
    setSelectedPetId(null);
  }, []);

  const refreshHistory = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleDeleteChat = useCallback((chatId, options = {}) => {
    return deleteChatMutation.mutate(chatId, {
      onSuccess: (data) => {
        if (options.onSuccess) options.onSuccess(data);
      },
      onError: (error) => {
        if (options.onError) options.onError(error);
      },
    });
  }, [deleteChatMutation]);

  const handleClearAllChats = useCallback((options = {}) => {
    return clearAllChatMutation.mutate(undefined, {
      onSuccess: (data) => {
        if (options.onSuccess) options.onSuccess(data);
      },
      onError: (error) => {
        if (options.onError) options.onError(error);
      },
    });
  }, [clearAllChatMutation]);

  return {
    history: chatHistoryData?.history || [],
    pets: chatHistoryData?.pets || [],
    user: chatHistoryData?.user,
    
    isLoading,
    error,
    selectedCategory,
    selectedPetId,
    
    isDeleting: deleteChatMutation.isPending,
    isClearing: clearAllChatMutation.isPending,
    deleteError: deleteChatMutation.error,
    clearError: clearAllChatMutation.error,
    
    handleCategoryFilter,
    handlePetFilter,
    clearFilters,
    refreshHistory,
    
    handleDeleteChat,
    handleClearAllChats,
    
    hasHistory: (chatHistoryData?.history || []).length > 0,
    filteredCount: (chatHistoryData?.history || []).length,
  };
} 