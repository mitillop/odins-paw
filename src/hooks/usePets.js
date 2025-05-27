"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPets } from "../app/actions/users/getPets";
import { createPetDiet } from "../app/actions/pets/createDiets";
import { createPet as createPetAPI } from "../app/actions/pets/createPet";
import { updatePet as updatePetAPI } from "../app/actions/pets/updatePet";
import { useAppDispatch } from "../libs/hooks";
import {
  setPet,
  selectPet,
  createPet as createPetAction,
  updatePet as updatePetAction,
  deletePet as deletePetAction,
} from "../libs/features/pet/petSlice";
import { deletePet as deletePetAPI } from "../app/actions/pets/deletePet";

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

  const createDietMutation = useMutation({
    mutationFn: createPetDiet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diets"] });
    },
  });

  const updatePetMutation = useMutation({
    mutationFn: updatePetAPI,
    onSuccess: (updatedPet) => {
      const updatedPets = queryClient.setQueryData(["pets"], (oldPets) => {
        if (!oldPets) return oldPets;
        return oldPets.map((pet) => 
          pet.id === updatedPet.id ? updatedPet : pet
        );
      });

      dispatch(updatePetAction(updatedPet));
      dispatch(selectPet(updatedPet));

      if (updatedPets) {
        dispatch(setPet(updatedPets));
      }

      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  const deletePetMutation = useMutation({
    mutationFn: deletePetAPI,
    onSuccess: (deletedPet) => {
      dispatch(deletePetAction(deletedPet));
      
      queryClient.invalidateQueries({ queryKey: ['pets'] })
        .then(() => {
          const updatedPets = queryClient.getQueryData(['pets']);
          selectLatestPet(updatedPets);
        });
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
    dispatch(selectPet(pet));
  };

  const handleCreatePet = (petData, options = {}) => {
    return createPetMutation.mutate(petData, {
      onSuccess: (data) => {
        if (options.onSuccess) options.onSuccess(data);
        createDietMutation.mutate(petData);
      },
      onError: (error) => {
        if (options.onError) options.onError(error);
      },
    });
  };

  const handleUpdatePet = (petData, options = {}) => {
    return updatePetMutation.mutate(petData, {
      onSuccess: (updatedPet) => {
        dispatch(updatePet(updatedPet));
        queryClient.invalidateQueries({ queryKey: ['pets'] });
        if (options.onSuccess) options.onSuccess(updatedPet);
      },
      onError: (error) => {
        if (options.onError) options.onError(error);
      },
    });
  };

  const handleDeletePet = (petData, options = {}) => {
    return deletePetMutation.mutate(petData, {
      onSuccess: (data) => {
        if (options.onSuccess) options.onSuccess(data);
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
    isCreatingDiet: createDietMutation.isPending,
    updatePet: handleUpdatePet,
    isUpdating: updatePetMutation.isPending,
    deletePet: handleDeletePet,
    isDeleting: deletePetMutation.isPending,
  };
}
