import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";
//import { beginApiCall, apiCallError } from "./apiStatusActions";

export function signInUserSuccess(user) {
  return { type: types.SIGN_IN_USER_SUCCESS, user };
}

export function signInUserFailed() {
  return { type: types.SIGN_IN_USER_FAILED, user: {} };
}

export function signOutUserSuccess(user) {
  return { type: types.SIGN_OUT_USER_SUCCESS, user };
}

export function signInProgress() {
  return { type: types.SIGN_IN_PROGRESS, progress: true };
}

export function signIn() {
  return function () {
    return userApi.signIn();
  };
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

export function signOut(origin) {
  return function (dispatch) {
    return userApi
      .signOut(origin)
      .then(user => {
        dispatch(signOutUserSuccess(user));
      })
      .catch(error => {
        throw error;
      });
  };
}