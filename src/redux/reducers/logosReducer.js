import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function logosReducer(state = initialState.logos, action) {
  switch (action.type) {
    case types.ADD_LOGO:
      {
        const logos = Object.assign({}, state);
        logos[action.logo.id] = { ...action.logo };
        return logos;
      }
    case types.DELETE_LOGO:
      {
        const logos = Object.assign({}, state);
        logos[action.logo.id] = { ...action.logo };
        return logos;
      }
    default:
      return state;
  }
}