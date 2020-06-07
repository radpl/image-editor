import config from "../config/config";
import auth0 from "../auth/auth";

const baseUrl = config.BASE_API_URL;

async function handleResponse(response) {
  if (response.ok) return response.json();
  throw new Error("Network response was not ok.");
}

function handleError(error) {
  console.error("API call failed. " + error);
  throw error;
}

export async function saveImage(image) {

  const auth = await auth0();
  const token = await auth.getTokenSilently();

  return fetch(baseUrl + "/images", {
    method: "POST",
    headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(image)
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function getUserImages(user) {

  const auth = await auth0();
  const token = await auth.getTokenSilently();

  return fetch(baseUrl + "/" + user._id + "/images", {
    method: "GET",
    headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
    // body: JSON.stringify(image)
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function getImageLogosApi(imageId) {

  const auth = await auth0();
  const token = await auth.getTokenSilently();

  return fetch(baseUrl + "/logos/" + imageId, {
    method: "GET",
    headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
    // body: JSON.stringify(image)
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function getImageBackgroundsApi(imageId) {

  const auth = await auth0();
  const token = await auth.getTokenSilently();

  return fetch(baseUrl + "/backgrounds/" + imageId, {
    method: "GET",
    headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
    // body: JSON.stringify(image)
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function getUserImage(user) {

  const auth = await auth0();
  const token = await auth.getTokenSilently();

  return fetch(baseUrl + "/" + user._id + "/images", {
    method: "GET",
    headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function saveLogo(logo) {

  const auth = await auth0();
  const token = await auth.getTokenSilently();

  return fetch(baseUrl + "/logos", {
    method: "POST",
    headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(logo)
  })

    .then(handleResponse)
    .catch(handleError);
}

export async function saveBackgrounds(background) {

  const auth = await auth0();
  const token = await auth.getTokenSilently();

  return fetch(baseUrl + "/backgrounds", {
    method: "POST",
    headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(background)
  })

    .then(handleResponse)
    .catch(handleError);
}