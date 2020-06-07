import * as types from "./actionTypes";
import * as imageApi from "../../api/imageApi";

export function addLogo(logo) {
  return { type: types.ADD_LOGO, logo };
}

export function deleteLogo(logo) {
  return { type: types.DELETE_LOGO, logo };
}


export function saveLogoSuccess(image) {
  return { type: types.SAVE_LOGO_SUCCESS, image };
}

export function saveLogoFailed() {
  return { type: types.SAVE_LOGO_FAILED, image: {} };
}

export function saveImageLogosSuccess(logoImages) {
  return { type: types.SAVE_IMAGE_LOGOS_SUCCESS, logoImages };
}

export function saveImageLogosFailed() {
  return { type: types.SAVE_IMAGE_LOGOS_FAILED, logoImages: [] };
}

export function saveImageLogosRemote(logos) {
  return { type: types.SAVE_IMAGE_LOGOS_REMOTE, logos };
}

export function saveLogo(logo) {
  return function (dispatch) {
    return imageApi.saveLogo(logo)
      .then(ok => {
        dispatch(saveLogoSuccess({ ...ok }));
      })
      .catch(error => {
        dispatch(saveLogoFailed());
        throw error;
      });
  };
}

export function getImageLogos(imageId) {
  return function (dispatch) {
    return imageApi.getImageLogosApi(imageId)
      .then(result => {
        dispatch(saveImageLogosSuccess(result));
      })
      .catch(error => {
        dispatch(saveImageLogosFailed());
        throw error;
      });
  };
}