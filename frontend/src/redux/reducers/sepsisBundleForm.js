import { findAllByDisplayValue } from "@testing-library/react";

const initialState = {
    checkedIdx: 0,
    ventilationChecked: findAllByDisplayValue
};

const sepsisBundleFormReducer = (state = initialState, action) => {
  if (action.type == "UPDATE_SEPSIS_FORM") {
    state = {...state, ...action.payload};
  }

  return state;
};

export default sepsisBundleFormReducer;
