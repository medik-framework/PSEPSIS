import { configureStore } from '@reduxjs/toolkit'
import apiUrlReducer from './reducers/misc'
import organDTReducer from './reducers/organDT'
import patientBasicReducer from './reducers/patientBasic'
import dialogsReducer from './reducers/dialogs'
import treatmentReducer from './reducers/treatment'
import sepsisBundleForm from './reducers/sepsisBundleForm'
import logReducer from './reducers/logs'
import drugReducer from './reducers/drugs'
import endpointsReducer from './reducers/endpoints'

export default configureStore({
  reducer: {
    organDT: organDTReducer,
    patientBasic: patientBasicReducer,
    misc: apiUrlReducer,
    dialogs: dialogsReducer,
    treatment: treatmentReducer,
    SepsisBundleForm: sepsisBundleForm,
    logs: logReducer,
    drug: drugReducer,
    endpoints: endpointsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['endpoints/addEndpoint'],
        ignoredActionPaths: ['endpoints.kEndpoint.sendMessage'],
        ignoredPaths: ['endpoints.kEndpoint'],
      },
    }),
})
