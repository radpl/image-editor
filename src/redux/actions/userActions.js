import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";
import * as imageApi from "../../api/imageApi";

//import { beginApiCall, apiCallError } from "./apiStatusActions";

export function signInUserSuccess(user) {
  return { type: types.SIGN_IN_USER_SUCCESS, user };
}

export function signInUserFailed() {
  return { type: types.SIGN_IN_USER_FAILED, user: {} };
}

export function saveImageSuccess(image) {
  return { type: types.SAVE_IMAGE_SUCCESS, image };
}

export function saveImageFailed() {
  return { type: types.SAVE_IMAGE_FAILED, image: {} };
}

export function getUser() {
  return function (dispatch) {
    return userApi.getUser()
      .then(user => {
        userApi.saveSignUp(user)
          .then(ok => {
            dispatch(signInUserSuccess({ ...user, db: ok }));
          })
      })
      .catch(error => {
        dispatch(signInUserFailed());
        throw error;
      });
  };
}

export function saveUserImage(image) {
  return function (dispatch) {
    return imageApi.saveImage(image);
  };
}
