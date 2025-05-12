"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Mascota } from "../../types/mascotaTypes";

interface MascotaState {
  selectedPet: Mascota | null;
  pets: Mascota[];
  loading: boolean;
  error: string | null;
}

const initialState: MascotaState = {
  pets: [],
  selectedPet: null,
  loading: false,
  error: null,
};

export const petSlice = createSlice({
  name: "pet",
  initialState: initialState,
  reducers: {
    selectPet: (state, action: PayloadAction<Mascota>) => {
      state.selectedPet = action.payload;
    },
    setPet: (state, action: PayloadAction<Mascota[]>) => {
      if (action.payload.length > 0) {
        state.selectedPet = action.payload[0];
        state.pets = action.payload;
      }
    },
    deletePet: (state, action: PayloadAction<Mascota>) => {
      const petToDelete = action.payload;
      state.pets = state.pets.filter((pet) => pet.id !== petToDelete.id);
      if (state.selectedPet?.id === petToDelete.id) {
        state.selectedPet = null;
      }
    },
    createPet: (state, action: PayloadAction<Mascota>) => {
      const newPet = action.payload;
      state.pets = [...state.pets, newPet];
      state.selectedPet = newPet;
    }
  },
});

export const { selectPet, setPet, deletePet, createPet } = petSlice.actions;
export default petSlice.reducer;