import { configureStore } from '@reduxjs/toolkit'
import OrganDTReducer from './organDataSlice'
import MiscReducer from './miscSlice'

export default configureStore({
  reducer: {
    OrganDT: OrganDTReducer,
    misc: MiscReducer
  }
})