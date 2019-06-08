import { SAVE_SEARCH_TERM } from "./types";

export const saveSearchTerm = searchTerm => dispatch => {
  dispatch({
    type: SAVE_SEARCH_TERM,
    payload: searchTerm
  });
};
