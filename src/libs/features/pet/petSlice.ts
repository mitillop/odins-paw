"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Mascota } from "../../types/mascotaTypes";

export interface Diet {
  id: string;
  name: string;
  description: string;
  calorie_intake: number;
  recommended_foods: string;
  grams: number;
  portion_sizes: {
    data: Array<{ name: string; value: number }>;
    colors: string[];
  };
  petId: string;
}

interface MascotaState {
  selectedPet: Mascota | null;
  selectedDiet: Diet | null;
  pets: Mascota[];
  loading: boolean;
  error: string | null;
}

const initialState: MascotaState = {
  pets: [],
  selectedPet: null,
  selectedDiet: null,
  loading: false,
  error: null,
};

export const petSlice = createSlice({
  name: "pet",
  initialState: initialState,
  reducers: {
    selectPet: (state, action: PayloadAction<Mascota>) => {
      state.selectedPet = action.payload;
      state.selectedDiet = null; // Reset selected diet when changing pet
    },
    setPet: (state, action: PayloadAction<Mascota[]>) => {
      if (action.payload.length > 0) {
        state.selectedPet = action.payload[0];
        state.pets = action.payload;
        state.selectedDiet = null; // Reset selected diet
      }
    },
    deletePet: (state, action: PayloadAction<Mascota>) => {
      const petToDelete = action.payload;
      state.pets = state.pets.filter((pet) => pet.id !== petToDelete.id);
      if (state.selectedPet?.id === petToDelete.id) {
        state.selectedPet = null;
        state.selectedDiet = null; // Reset selected diet
      }
    },
    createPet: (state, action: PayloadAction<Mascota>) => {
      const newPet = action.payload;
      state.pets = [...state.pets, newPet];
      state.selectedPet = newPet;
      state.selectedDiet = null; // Reset selected diet
    },
    selectDiet: (state, action: PayloadAction<Diet>) => {
      state.selectedDiet = action.payload;
    }
  },
});

export const { selectPet, setPet, deletePet, createPet, selectDiet } = petSlice.actions;
export default petSlice.reducer;