import * as types from "./actionTypes";

export function selected(tool) {
  return { type: types.SELECT_TOOL, tool };
}
