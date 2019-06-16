import { SAVE_SINGLE_PROPERTY } from "./types";

export const saveSingleProperty = property => dispatch => {
  dispatch({
    type: SAVE_SINGLE_PROPERTY,
    payload: property
  });
};
