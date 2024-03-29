import { createSlice } from '@reduxjs/toolkit'
import { checklists } from "../../resources/ChecklistConfig.js"

const getInitState = () => {
  let checklistHolder = {};
  Object.keys(checklists).map(
    (checklistName) => checklistHolder[checklistName] = []
  )
  return checklistHolder
}

const checklistsSlice =  createSlice({
  name: 'checklists',
  initialState: getInitState(),
  reducers: {
    toggle: (state, action) => {
      const checklistName = action.payload.checklist;
      const checkitemName = action.payload.item;
      if (state[checklistName].includes(checkitemName)) {
        state[checklistName].pop(checkitemName)
      } else {
        state[checklistName].push(checkitemName)
      }
    },
    update: (state, action) => {
      state[action.payload.checklistName] = action.payload.checkedItems;
    }
  }
});

export const { toggle, update } = checklistsSlice.actions
export default checklistsSlice.reducer
