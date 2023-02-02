import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  started: false,
  startTime: null,
}

export const treatmentSlice = createSlice({
  name: 'treatment',
  initialState: { ...initialState },
  reducers: {
    start: (state, action) => {
      state.started = true
      state.startTime = new Date().toJSON()
    },
    end: (state, action) => {
      state['started'] = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { start, end } = treatmentSlice.actions

export default treatmentSlice.reducer
