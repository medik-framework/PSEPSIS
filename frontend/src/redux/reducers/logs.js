import { createAction, createReducer } from '@reduxjs/toolkit'

const add = createAction("logs/add");

const initialState = {};

const logsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(add, (state, action) => {
      state = {...state, ...action.payload}
      return state
    })
})

export default logsReducer;
