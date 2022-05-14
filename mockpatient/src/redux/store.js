import { configureStore } from '@reduxjs/toolkit'
import organDataReducer from './organDataSlice'
import miscReducer from './miscSlice'

export default configureStore({
  reducer: {
    organData: organDataReducer,
    misc: miscReducer,
  },
})