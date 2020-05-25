import config from "../config/config";
import auth0 from "../auth/auth";

const baseUrl = config.BASE_API_URL + "/users";


async function handleResponse(response) {
  if (response.ok) return response.json();
  throw new Error("Network response was not ok.");
}

function handleError(error) {
  console.error("API call failed. " + error);
  throw error;
}

export function getUsers() {
  return fetch(baseUrl, {
    headers: {
      Authorization: `Bearer ${auth0.getAccessToken()}`
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteUser(userId) {
  return fetch(baseUrl + "/" + userId.toString(), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${auth0.getAccessToken()}`
    }
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function getUser() {
  try {
    const auth = await auth0();
    const isAuth = await auth.isAuthenticated();

    if (isAuth) {
      return auth.getUser();
    } else {
      throw Error;
      //auth.loginWithRedirect({ redirect_uri: 'http://localhost:3000/callback' })
    }
  } catch (e) {
    throw Error;
  }
};

export async function signIn() {
  try {
    const auth = await auth0();
    await auth.loginWithRedirect({});
  } catch (e) {
    throw Error;
  }
};

export async function signOut(origin) {
  const auth = await auth0();
  return auth.logout(origin);
}

export function saveSignUp() {
  return fetch(baseUrl + "/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${auth0.getAccessToken()}`
    }
  })
    .then(handleResponse)
    .catch(handleError);
}
