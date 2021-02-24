import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { getAccessToken } from "lib/getAccessToken";

export default withApiAuthRequired(async function myApiRoute(req, res) {
  try {
    const session = getSession(req, res);
    const token = await getAccessToken();
    const { data: resp } = await axios.get(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${session?.user.sub}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    res.json(resp);
  } catch (error) {
    res.json(error);
  }
});
