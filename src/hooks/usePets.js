"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPets } from "../app/actions/users/getPets";
import { createPetDiet } from "../app/actions/pets/createDiets";
import { createPet as createPetAPI } from "../app/actions/pets/createPet";
import { useAppDispatch } from "../libs/hooks";
import {
  setPet,
  selectPet,
  createPet as createPetAction,
} from "../libs/features/pet/petSlice";

export function usePets() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const {
    data: pets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pets"],
    queryFn: getPets,
    onSuccess: (data) => {
      if (data && data.length > 0) {
        dispatch(setPet(data));
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const createPetMutation = useMutation({
    mutationFn: createPetAPI,
    onSuccess: (newPet) => {
      dispatch(createPetAction(newPet));
      dispatch(selectPet(newPet));
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  const selectLatestPet = (availablePets) => {
    if (availablePets && availablePets.length > 0) {
      const latestPet = availablePets[0];
      dispatch(selectPet(latestPet));
      return latestPet;
    }
    return null;
  };

  const handleSelectPet = (pet) => {
    console.log("Selected pet:", pet);
    dispatch(selectPet(pet));
  };

  const handleCreatePet = (petData, options = {}) => {
    return createPetMutation.mutate(petData, {
      onSuccess: (data) => {
        if (options.onSuccess) options.onSuccess(data);
        createPetDiet(petData);
      },
      onError: (error) => {
        if (options.onError) options.onError(error);
      },
    });
  };

  return {
    pets,
    isLoading,
    error,
    handleSelectPet,
    selectLatestPet,
    createNewPet: handleCreatePet,
    isCreating: createPetMutation.isPending,
  };
}
