import { createSlice } from '@reduxjs/toolkit'

export const endpointsSlice = createSlice({
  name: 'endpoints',
  initialState: {},
  reducers: {
    addEndpoint: (state, action) => {
      state[action.payload.endpointId] = action.payload.endpointHandlers
    }
  }
});

export const { addEndpoint } = endpointsSlice.actions
export default endpointsSlice.reducer
