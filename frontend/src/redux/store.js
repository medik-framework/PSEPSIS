import { configureStore } from '@reduxjs/toolkit'
import apiUrlReducer from './reducers/misc'
import organDTReducer from './reducers/organDT'
import patientBasicReducer from './reducers/patientBasic'
import dialogsReducer from './reducers/dialogs'

export default configureStore({
  reducer: {
    organDT: organDTReducer,
    patientBasic: patientBasicReducer,
    misc: apiUrlReducer,
    dialogs: dialogsReducer,
  },
})