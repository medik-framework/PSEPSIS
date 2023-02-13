import { createSlice } from '@reduxjs/toolkit'

const initialState = { apiURL: "http://172.17.0.2:4002/" }

export const miscSlice = createSlice({
  name: 'misc',
  initialState: { ...initialState },
  reducers: {
    updateURL: (state, action) => {
      state['apiURL'] = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateURL } = miscSlice.actions

export default miscSlice.reducer
