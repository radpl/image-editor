import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.SIGN_IN_USER_SUCCESS:
      return { ...action.user, isAuthenticated: true };
    case types.SIGN_OUT_USER_SUCCESS:
      return {};
    case types.SIGN_IN_PROGRESS:
      return {};
    case types.SIGN_IN_USER_FAILED:
      return {};
    default:
      return state;
  }
}