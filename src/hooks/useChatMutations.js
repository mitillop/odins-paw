"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useChatMutations() {
  const queryClient = useQueryClient();

  const invalidateChatHistory = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["chatHistory"] });
  }, [queryClient]);

  const addOptimisticChat = useCallback((newChat) => {
    queryClient.setQueriesData(
      { queryKey: ["chatHistory"] },
      (oldData) => {
        if (oldData?.history) {
          return {
            ...oldData,
            history: [newChat, ...oldData.history]
          };
        }
        return oldData;
      }
    );
  }, [queryClient]);

  const onChatCreated = useCallback((chatData) => {
    invalidateChatHistory();
  }, [invalidateChatHistory]);

  return {
    invalidateChatHistory,
    addOptimisticChat,
    onChatCreated,
  };
} 