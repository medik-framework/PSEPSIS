import { createSlice } from '@reduxjs/toolkit'

const { REACT_APP_USER_URL } = process.env

const initialState = {
  apiURL: "172.17.0.2:4002",
  kwsURL: REACT_APP_USER_URL,
}

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
