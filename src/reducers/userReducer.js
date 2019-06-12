import { SAVE_TOKEN_USER, UPDATE_SIGN_STATUS } from "../actions/types";

const initialState = {
  token: "",
  signStatus: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_TOKEN_USER:
      return {
        ...state,
        token: action.payload
      };
    case UPDATE_SIGN_STATUS:
      return {
        ...state,
        signStatus: action.payload
      };

    default:
      return state;
  }
}
