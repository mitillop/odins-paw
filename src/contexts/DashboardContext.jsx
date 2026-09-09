"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getPets } from "../app/actions/users/getPets";
import { getDiets } from "../app/actions/pets/getDiets";
import { createPetDiet } from "../app/actions/pets/createDiets";
import { deleteDiets } from "../app/actions/pets/deleteDiets";
import { useAppSelector, useAppDispatch } from "../libs/hooks";
import {
  setPet,
  selectPet,
  selectDiet,
  createPet as createPetAction,
  updatePet as updatePetAction,
  deletePet as deletePetAction,
} from "../libs/features/pet/petSlice";
import { createPet as createPetAPI } from "../app/actions/pets/createPet";
import { updatePet as updatePetAPI } from "../app/actions/pets/updatePet";
import { deletePet as deletePetAPI } from "../app/actions/pets/deletePet";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const selectedPet = useAppSelector((state) => state.pet.selectedPet);
  const selectedDiet = useAppSelector((state) => state.pet.selectedDiet);

  // Fetch pets - ONCE
  const {
    data: pets,
    isLoading: isLoadingPets,
    error: petsError,
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

  // Fetch diets - ONCE per selected pet
  const {
    data: diets,
    isLoading: isLoadingDiets,
    error: dietsError,
  } = useQuery({
    queryKey: ["diets", selectedPet?.id],
    queryFn: () => getDiets(selectedPet?.id),
    enabled: !!selectedPet?.id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // Auto-select first diet
  React.useEffect(() => {
    if (diets && diets.length > 0 && !selectedDiet) {
      const serializedDiet = {
        ...diets[0],
        id: String(diets[0].id),
        petId: String(diets[0].petId),
      };
      dispatch(selectDiet(serializedDiet));
    }
  }, [diets, selectedDiet, dispatch]);

  // Mutations
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
      dispatch(updatePetAction(updatedPet));
      dispatch(selectPet(updatedPet));
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  const deletePetMutation = useMutation({
    mutationFn: deletePetAPI,
    onSuccess: (deletedPet) => {
      dispatch(deletePetAction(deletedPet));
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  const deleteDietsMutation = useMutation({
    mutationFn: (petId) => deleteDiets(petId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diets"] });
      dispatch(selectDiet(null));
    },
  });

  // Handlers
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

  const handleRegenerateDiets = async (petData) => {
    try {
      await deleteDietsMutation.mutateAsync(petData.id);
      await createDietMutation.mutateAsync(petData);
      return true;
    } catch (error) {
      console.error("Error regenerating diets:", error);
      return false;
    }
  };

  const selectLatestPet = (availablePets) => {
    if (availablePets && availablePets.length > 0) {
      const latestPet = availablePets[0];
      dispatch(selectPet(latestPet));
      return latestPet;
    }
    return null;
  };

  const value = useMemo(
    () => ({
      pets,
      isLoadingPets,
      petsError,
      diets,
      isLoadingDiets,
      dietsError,
      selectedPet,
      selectedDiet,
      handleSelectPet,
      handleCreatePet,
      handleUpdatePet,
      handleDeletePet,
      handleRegenerateDiets,
      selectLatestPet,
      isCreating: createPetMutation.isPending,
      isCreatingDiet: createDietMutation.isPending,
      isUpdating: updatePetMutation.isPending,
      isDeleting: deletePetMutation.isPending,
      isRegeneratingDiets: deleteDietsMutation.isPending || createDietMutation.isPending,
    }),
    [
      pets,
      isLoadingPets,
      petsError,
      diets,
      isLoadingDiets,
      dietsError,
      selectedPet,
      selectedDiet,
      createPetMutation.isPending,
      createDietMutation.isPending,
      updatePetMutation.isPending,
      deletePetMutation.isPending,
      deleteDietsMutation.isPending,
    ]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
