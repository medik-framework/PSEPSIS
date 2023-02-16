const initialState = {
    checkedIdx: 0,
    ventilationChecked: false
};

const sepsisBundleFormReducer = (state = initialState, action) => {
  if (action.type === "UPDATE_SEPSIS_FORM") {
    state = {...state, ...action.payload};
  }

  return state;
};

export default sepsisBundleFormReducer;
