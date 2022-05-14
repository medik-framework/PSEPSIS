import { configureStore } from '@reduxjs/toolkit'
import apiUrlReducer from './reducers/misc'
import organDTReducer from './reducers/organDT'

export default configureStore({
  reducer: {
    organDT: organDTReducer,
    misc: apiUrlReducer
  },
})