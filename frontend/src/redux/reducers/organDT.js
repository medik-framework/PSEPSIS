import { OrganDTConfig } from "../../resources/DigitalTwinConfigReorganized";
<<<<<<< HEAD
import { createAction, createReducer } from '@reduxjs/toolkit'
import { ConnectedTvOutlined } from "@mui/icons-material";
import { act } from "react-dom/test-utils";

const update = createAction("organDT/update");
const update_all = createAction("organDT/update_all");
=======
import { createSlice } from '@reduxjs/toolkit'
>>>>>>> f9df0bb (finish digital twin)

const initialState = {};
OrganDTConfig.map((organ) => {
    const measurements = organ.measurements;
    initialState[organ.name] = Object.keys(measurements).reduce((prev, key) => {
        prev[measurements[key].name] = {'value':NaN, 'time':NaN};
        return prev;
    }, {});
    return [];
});

<<<<<<< HEAD
const organDTReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(update_all, (state, action) => {
        const data = action.payload;
        OrganDTConfig.map((organ) => {
          state[organ.name] = data[organ.name]
          return [];
        });
      })
      .addCase(update, (state, action) => {
        // const data = {[action.payload.measurement] :
        //   {'value':action.payload.value, 'time':action.payload.timeStamp}
        // }
        // OrganDTConfig.map((organ) => {
        //   const measurements = organ.measurements;
        //   Object.keys(measurements).map((m) => {
        //     if (m.name == action.payload.measurement) {
        //       state[organ.name] = {...state[organ.name], ...data}
        //     }
        //   })
        // })
        //   state[organ.name] = action.payload[organ.name]
        //   return [];
        // });
        // const data = action.payload
        // console.log(data)
        // console.log(state.toString())
        // state[data.organ][data.measurement] = {'value': data.value, 'time':data.timeStamp}
      })
=======
export const organDTSlice = createSlice({
  name: 'organDT',
  initialState: {...initialState},
  reducers:{
    update_all: (state, action) => {
      const data = action.payload;
      console.log("update organ data")
      OrganDTConfig.map((organ) => {
        state[organ.name] = data[organ.name]
        return [];
      });
    },
  }
>>>>>>> f9df0bb (finish digital twin)
});

export const { update_all }  = organDTSlice.actions

export default organDTSlice.reducer
