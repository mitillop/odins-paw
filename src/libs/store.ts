import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/UserSlice'
import mascotaSlice from './features/pet/petSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      pet: mascotaSlice,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
