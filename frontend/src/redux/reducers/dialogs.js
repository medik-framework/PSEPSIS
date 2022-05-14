import { createAction, createReducer } from '@reduxjs/toolkit'

const update = createAction("dialogs/update");
const setDone = createAction("dialogs/setDone");
const initialState = {
  hist: {},
  todo: []
};

const dialogsReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(update, (state, action) => {
        const backendKeys = Object.keys(action.payload);
        const frontendKeys = Object.keys(state.hist);
        const diff = backendKeys.filter(x => !frontendKeys.includes(x));
        if(diff.length !== 0){
          diff.map((d) => {
            state.hist = {
              ...state.hist, 
              [d]: {"title":action.payload[d], "return": undefined}
            }
            state.todo.push(d)
          }, [])
        }
      })
      .addCase(setDone, (state, action) => {
        console.log(action.payload)
        state.hist[action.payload.id]['return'] = action.payload.return;
        const index = state.todo.indexOf(action.payload.id);
        if (index !== -1) {
          state.todo.splice(index, 1);
        }
      })
  })

  export default dialogsReducer;