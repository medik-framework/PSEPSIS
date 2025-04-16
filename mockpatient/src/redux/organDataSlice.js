import { createSlice } from '@reduxjs/toolkit'
import { OrganDTConfig } from "../resources/DigitalTwinConfigReorganized";

const initialState = {};
OrganDTConfig.map((organ) => {
    const measurements = organ.measurements;
    initialState[organ.name] = Object.keys(measurements).reduce((prev, key) => {
        const m_config = {...measurements[key], getThres: null, formula: null}
        prev[measurements[key].name] = {
            value: null,
            target: null,
            period: null,
            step: 0,
            elapse: 0,
            delay: null,
            config: m_config
        };
        return prev;
    }, {});
    return [];
});

export const organDataSlice = createSlice({
  name: 'organDT',
  initialState: { ...initialState },
  reducers: {
    update: (state, action) => {
      state[action.payload.organName][action.payload.measurementName].value = action.payload.value;

    },
    increment: (state, action) => {
      state[action.payload.organName][action.payload.measurementName].value += action.payload.value;
      state[action.payload.organName][action.payload.measurementName].elapse += 1;
    },
    setGradualUpdate: (state, action) => {
      const { organName, measurementName, target, period, step, delay } = action.payload;
      state[organName][measurementName].target = target;
      state[organName][measurementName].period = period;
      state[organName][measurementName].step = step;
      state[organName][measurementName].delay = delay;
      state[organName][measurementName].elapse = 0;
    },
    incrementElapse: (state, action) => {
      const { organName, measurementName } = action.payload;

      if (!state[organName] || !state[organName][measurementName]) {
          console.error(`Error: ${organName}.${measurementName} not found in Redux state.`);
          return;
      }

      state[organName][measurementName].elapse += 1;
    },
    resetGradualUpdate: (state, action) => {

      const { organName, measurementName } = action.payload;

      state[organName][measurementName].target = 0;
      state[organName][measurementName].period = 0;
      state[organName][measurementName].step = 0;
      state[organName][measurementName].delay = 0;
      state[organName][measurementName].elapse = 0;
    }
  },
})

export const { update, increment, setGradualUpdate, incrementElapse, resetGradualUpdate } = organDataSlice.actions;
export default organDataSlice.reducer;
