import { SAVE_SINGLE_PROPERTY } from "../actions/types";

const initialState = {
  singleProperty: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_SINGLE_PROPERTY:
      return {
        ...state,
        singleProperty: action.payload
      };
    default:
      return state;
  }
}
