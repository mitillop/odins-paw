"use client";

import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T = unknown>(selector: (state: RootState) => T): T => 
  useSelector<RootState, T>(selector);
export const useAppStore = () => useStore<AppStore>();