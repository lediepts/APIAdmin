import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
// import { myCustomLogger, myCustomErrorReporter } from "../utils";

export default handleAuth({
  async login(req, res) {
    try {
      // Add your own custom logger
      // myCustomLogger("Logging in");
      // Pass custom parameters to login
      await handleLogin(req, res, {
        authorizationParams: {
          // or AUTH0_AUDIENCE
          audience: "https://dev-4s-jp.us.auth0.com/api/v2/",
          // Add the `offline_access` scope to also get a Refresh Token
          scope: "openid profile email read:users_app_metadata", // or AUTH0_SCOPE
        },
        returnTo: "/admin",
      });
    } catch (error) {
      // Add your own custom error handling
      // myCustomErrorReporter(error);
      res.status(error.status || 400).end(error.message);
    }
  },
});
