import { medicationCategories } from "../../resources/MedicationTableSchema";

const medicationTabReducer = (state = medicationCategories[0], action) => {
  if (action.type == "CHANGE_MEDICATION_TAB") {
    state = action.payload;
  }

  return state;
};

export default medicationTabReducer;
