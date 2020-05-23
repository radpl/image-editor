import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function logosReducer(state = initialState.texts, action) {
  switch (action.type) {
    case types.ADD_TEXT:
      {
        const texts = Object.assign({}, state);
        texts[action.text.id] = { ...action.text };
        return texts;
      }
    case types.DELETE_TEXT:
      {
        const texts = Object.assign({}, state);
        texts[action.text.id] = { ...action.text };
        return texts;
      }
    default:
      return state;
  }
}