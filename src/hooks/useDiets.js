"use client";

import { useQuery } from "@tanstack/react-query";
import { getDiets } from "../app/actions/pets/getDiets";
import { useAppSelector } from "../libs/hooks";

export function useDiets() {
  const selectedPet = useAppSelector((state) => state.pet.selectedPet);

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

  return {
    diets,
    isLoading,
    error,
  };
}
