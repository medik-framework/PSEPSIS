import { createAction, createReducer } from '@reduxjs/toolkit'

const update = createAction("dialogs/update");
const setDone = createAction("dialogs/setDone");

const initialState = {
  counter: 1,
  hist: {},
  todo: []
};

const dialogsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(update, (state, action) => {
      state.todo.push(action.payload);
    })
    .addCase(setDone, (state, action) => {
      state.todo.splice(0, 1);
      state.hist = {
        ...state.hist,
        [state.counter]: action.payload
      }
      state.counter += 1;
    })
})

export default dialogsReducer;
