const initialState = {};

const checkListReducer = (state = initialState, action) => {
  if (action.type == "TOGGLE_CHECKLIST_ITEM") {
    const checklist = action.payload.checklist;
    const item = action.payload.item;

    if (Object.keys(state).includes(checklist)) {
      if (state[checklist].includes(item)) {
        state[checklist].pop(item);
      } else {
        state[checklist] = [...state[checklist], item];
      }
    } else {
      state[checklist] = [item];
    }

    if (item === "None" && state[checklist].includes(item)) {
      state[checklist] = [item];
    }

    if (item !== "None" && state[checklist].includes("None")) {
      state[checklist] = [item];
    }

    state = { ...state };
  }

  return state;
};

export default checkListReducer;
