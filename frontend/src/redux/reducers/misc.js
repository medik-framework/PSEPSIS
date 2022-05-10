import { createSlice } from '@reduxjs/toolkit'

// "psepsis.herokuapp.com/submi"

const initialState = { apiURL: "127.0.0.1:5000"}

export const miscSlice = createSlice({
  name: 'misc',
  initialState: { ...initialState },
  reducers: {
    updateURL: (state, action) => {
      state['apiURL'] = action.payload.value
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateURL } = miscSlice.actions

export default miscSlice.reducer