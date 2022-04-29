import { configureStore } from '@reduxjs/toolkit'
import OrganDTReducer from './reducers'

export default configureStore({
  reducer: {
    OrganDT: OrganDTReducer
  }
})