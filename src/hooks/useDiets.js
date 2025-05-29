"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDiets } from "../app/actions/pets/getDiets";
import { useAppSelector, useAppDispatch } from "../libs/hooks";
import { useEffect } from "react";
import { selectDiet } from "../libs/features/pet/petSlice";
import { deleteDiets } from "../app/actions/pets/deleteDiets";
import { createPetDiet } from "../app/actions/pets/createDiets";

export function useDiets() {
  const selectedPet = useAppSelector((state) => state.pet.selectedPet);
  const selectedDiet = useAppSelector((state) => state.pet.selectedDiet);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const {
    data: diets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["diets", selectedPet?.id],
    queryFn: () => getDiets(selectedPet?.id),
    enabled: !!selectedPet?.id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });  

  const deleteDietsMutation = useMutation({
    mutationFn: (petId) => deleteDiets(petId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diets"] });
      dispatch(selectDiet(null));
    }
  });

  const createDietMutation = useMutation({
    mutationFn: createPetDiet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diets"] });
    }
  });

  useEffect(() => {
    if (diets && diets.length > 0 && !selectedDiet) {
      const serializedDiet = {
        ...diets[0],
        id: String(diets[0].id),
        petId: String(diets[0].petId)
      };
      dispatch(selectDiet(serializedDiet));
    }
  }, [diets, selectedDiet, dispatch]);

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

  return {
    diets,
    isLoading,
    error,
    regenerateDiets: handleRegenerateDiets,
    isRegeneratingDiets: deleteDietsMutation.isPending || createDietMutation.isPending
  };
}
