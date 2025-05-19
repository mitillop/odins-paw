"use client";

import { useQuery } from "@tanstack/react-query";
import { getDiets } from "../app/actions/pets/getDiets";
import { useAppSelector, useAppDispatch } from "../libs/hooks";
import { useEffect } from "react";
import { selectDiet } from "../libs/features/pet/petSlice";

export function useDiets() {
  const selectedPet = useAppSelector((state) => state.pet.selectedPet);
  const selectedDiet = useAppSelector((state) => state.pet.selectedDiet);
  const dispatch = useAppDispatch();

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

  return {
    diets,
    isLoading,
    error,
  };
}
