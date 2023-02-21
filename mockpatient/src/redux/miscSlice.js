import { createSlice } from '@reduxjs/toolkit'

// const initialState = { apiURL: "http://172.17.0.2:4002/" }

const initialState = {
  apiURL: "127.0.0.1:4000",
  kwsURL: 'ws://127.0.0.1:4124',
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
