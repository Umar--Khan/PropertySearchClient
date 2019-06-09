import { SAVE_SEARCH_TERM, SAVE_API_DATA } from "../actions/types";
// import { access } from "fs";

const initialState = {
  searchTerm: "",
  data: {}
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
    default:
      return state;
  }
}
