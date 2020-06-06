import config from "../config/config";
import auth0 from "../auth/auth";

const baseUrl = config.BASE_API_URL + "/images";

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

  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(image)
  })
    .then(handleResponse)
    .catch(handleError);
}
