const timerReducer = (state = {started: false}, action) => {
  if (action.type == "START_TIMER") {
    state = {started: true, start_time: new Date()};
  }
  if (state.start_time instanceof String) {
    state.start_time = Date.parse(state.start_time)
  }
  return state;
};

export default timerReducer;
