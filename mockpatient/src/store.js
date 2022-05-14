import { configureStore } from '@reduxjs/toolkit'
import organDataReducer from './organDataSlice'

export default configureStore({
  reducer: {
    organData: organDataReducer,
  },
})