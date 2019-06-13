import { SAVE_CURRENT_USER } from "./types";

export const saveCurrentUser = user => dispatch => {
  dispatch({
    type: SAVE_CURRENT_USER,
    payload: user
  });
};
