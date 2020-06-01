import * as types from "./actionTypes";

export function changeColor(color) {
  return { type: types.COLOR_CHANGE, color };
}