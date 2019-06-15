import {
  SAVE_SEARCH_TERM,
  SAVE_API_DATA,
  UPDATE_ERROR,
  UPDATE_PAGE_NUMBER,
  UPDATE_MAX_RESULTS_NUMBER
} from "../actions/types";

const initialState = {
  searchTerm: "",
  data: "",
  error: false,
  pageNumber: 1,
  maxResultsNumber: 20
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
    case UPDATE_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.payload
      };
    case UPDATE_MAX_RESULTS_NUMBER:
      return {
        ...state,
        maxResultsNumber: action.payload
      };
    default:
      return state;
  }
}
