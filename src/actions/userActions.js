import { SAVE_TOKEN_USER, UPDATE_SIGN_STATUS } from "./types";

export const saveTokenUser = user => dispatch => {
  dispatch({
    type: SAVE_TOKEN_USER,
    payload: user
  });
};

export const updateSignStatus = user => dispatch => {
  dispatch({
    type: UPDATE_SIGN_STATUS,
    payload: user
  });
};
