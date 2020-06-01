import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function colorReducer(state = initialState.color, action) {
  switch (action.type) {
    case types.COLOR_CHANGE:
      {
        return action.color;
      }
    default:
      return state;
  }
}