import * as types from "./actionTypes";

export function addText(text) {
  return { type: types.ADD_TEXT, text };
}

export function deleteText(text) {
  return { type: types.DELETE_TEXT, text };
}