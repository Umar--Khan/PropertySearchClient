import {
  SAVE_SEARCH_TERM,
  SAVE_API_DATA,
  UPDATE_ERROR
} from "../actions/types";

const initialState = {
  searchTerm: "",
  data: {},
  error: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };
    case SAVE_API_DATA:
      return {
        ...state,
        data: action.payload
      };
    case UPDATE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
