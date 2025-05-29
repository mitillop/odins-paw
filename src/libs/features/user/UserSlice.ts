"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface UserState {
  id: number;
  name: string;
  email: string;
}
const initialState: UserState = {
  id: 0,
  name: "",
  email: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number | undefined>) => {
      const incrementBy = action.payload !== undefined ? action.payload : 1;
    },
    decrement: (state, action: PayloadAction<number | undefined>) => {
      const incrementBy = action.payload !== undefined ? action.payload : 1;
    },
    resetState: (state) => {
    },
  },
});
export const { increment, decrement, resetState } = userSlice.actions;
export default userSlice.reducer;
