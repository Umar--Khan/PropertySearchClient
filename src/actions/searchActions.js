import { SAVE_SEARCH_TERM, SAVE_API_DATA, UPDATE_ERROR } from "./types";

export const saveSearchTerm = searchTerm => dispatch => {
  dispatch({
    type: SAVE_SEARCH_TERM,
    payload: searchTerm
  });
};

export const saveApiData = data => dispatch => {
  dispatch({
    type: SAVE_API_DATA,
    payload: data
  });
};

export const errorPage = data => dispatch => {
  dispatch({
    type: UPDATE_ERROR,
    payload: data
  });
};
