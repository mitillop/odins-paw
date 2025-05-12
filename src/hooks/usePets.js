"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPets } from '../app/actions/users/getPets';
import { createPet } from '../app/actions/pets/createPet';
import { useAppDispatch } from '../libs/hooks';
import { setPet, selectPet } from '../libs/features/pet/petSlice';

export function usePets() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  
  const { data: pets, isLoading, error } = useQuery({
    queryKey: ['pets'],
    queryFn: getPets,
    onSuccess: (data) => {
      if (data && data.length > 0) {
        dispatch(setPet(data));
      }
    },
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Unused data remains in cache for 10 minutes
    refetchOnMount: false, // Prevent refetch when component remounts
    refetchOnWindowFocus: false, // Prevent refetch when window regains focus
  });

  const createPetMutation = useMutation({
    mutationFn: createPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
  });

  const handleSelectPet = (pet) => {
    dispatch(selectPet(pet));
  };

  return {
    pets,
    isLoading,
    error,
    handleSelectPet,
    createNewPet: createPetMutation.mutate,
    isCreating: createPetMutation.isPending
  };
}