import { createAction, createReducer } from '@reduxjs/toolkit'
import { DialogConfig } from '../../resources/DialogConfig';

const setShow = createAction("dialogs/setShow");
const update = createAction("dialogs/update");
const setDone = createAction("dialogs/setDone");
// const initialState = {}
// Object.keys(DialogConfig).map((d) => {
//   initialState[d] = false;
//   return [];
// });

// const dialogsReducer = createReducer(initialState, (builder) => {
//     builder
//       .addCase(setShow, (state, action) => {
//         return
//       })
//       .addCase(setDone, (state, action) => {
//         return
//       })
// })

const initialState = {
  counter: 0,
  hist: {},
  todo: []
};

const dialogsReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(update, (state, action) => {
        console.log(action.payload);
        state.todo.push(action.payload);
      })
      .addCase(setDone, (state, action) => {
        console.log(action.payload)
        state.todo.splice(0, 1);
        state.counter += 1;
        state.hist = {
          ...state.hist,
          counter: action.payload
        }
      })
  })

  export default dialogsReducer;
