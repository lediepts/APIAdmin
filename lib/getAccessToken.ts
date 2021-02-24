import axios from "axios";

export async function getAccessToken() {
  const { data } = await axios(
    process.env.AUTH0_ISSUER_BASE_URL + "/oauth/token",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: {
        client_id: process.env.AUTH0_API_CLIENT_ID,
        client_secret: process.env.AUTH0_API_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: "client_credentials",
      },
    }
  );
  return `${data.token_type} ${data.access_token}`;
}
