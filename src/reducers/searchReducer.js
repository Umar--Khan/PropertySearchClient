import { SAVE_SEARCH_TERM } from "../actions/types";

const initialState = {
  searchTerm: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };
    default:
      return state;
  }
}
