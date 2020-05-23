import * as types from "./actionTypes";

export function addLogo(logo) {
  return { type: types.ADD_LOGO, logo };
}

export function deleteLogo(logo) {
  return { type: types.DELETE_LOGO, logo };
}