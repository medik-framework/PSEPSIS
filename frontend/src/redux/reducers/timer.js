const timerReducer = (state = false, action) => {
  if (action.type == "START_TIMER") {
    state = true;
  }

  return state;
};

export default timerReducer;
