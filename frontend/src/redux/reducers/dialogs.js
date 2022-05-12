import { createAction, createReducer } from '@reduxjs/toolkit'

const update = createAction("dialogs/update")
const initialState = [];

const dialogsReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(update, (state, action) => {
        state = action.payload;
      })
  })

  export default dialogsReducer;