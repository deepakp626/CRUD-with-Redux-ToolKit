import { configureStore } from '@reduxjs/toolkit'
import userDeailSlice from '../features/userDeailSlice'

export const store = configureStore({
  reducer: {
    app:userDeailSlice,
  },
})