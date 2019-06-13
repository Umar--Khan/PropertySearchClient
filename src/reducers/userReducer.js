import { SAVE_CURRENT_USER } from "../actions/types";

const initialState = {
  currentUser: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
}
