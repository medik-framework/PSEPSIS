import { configureStore } from '@reduxjs/toolkit'
import OrganDTReducer from './organDataSlice'
import MiscReducer from './miscSlice'
// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer, createTransform } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // Uses localStorage
// import { combineReducers } from "redux";

export default configureStore({
  reducer: {
    OrganDT: OrganDTReducer,
    misc: MiscReducer
  }
});