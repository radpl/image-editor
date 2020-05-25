import createAuth0Client from "@auth0/auth0-spa-js";
import auth_config from "../auth_config.json";
import history from "../utils/history";


const auth0 = () => {
  return new Promise(async (resolve, reject) => {
    let client
    if (!client) {
      try {
        client = await createAuth0Client({
          domain: "dev-cbv9d1rm.auth0.com",
          client_id: "63rXu0URC9PV1D1W0RJqFL00KMvUigaW",
          audience: "https://api.alwera.pl",
          redirect_uri: window.location.origin,
        });
        resolve(client)
      } catch (e) {
        reject(new Error('getAuth0Client Error', e))
      }
    }
  })
}

export const login = async (targetUrl) => {
  try {
    console.log("Logging in", targetUrl);

    const options = { redirect_uri: window.location.origin };
    if (targetUrl) { options.appState = { targetUrl }; }

    await auth0.loginWithRedirect(options);
  } catch (err) {
    console.log("Log in failed", err);
  }
};

export const logout = () => {
  try {
    console.log("Logging out");
    auth0.logout({
      returnTo: window.location.origin
    });
  } catch (err) {
    console.log("Log out failed", err);
  }
};

export const isAuthenticated = async () => {
  const response = await auth0.isAuthenticated();
  return response;
}

export default auth0;