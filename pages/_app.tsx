import { UserProvider } from "@auth0/nextjs-auth0";
import type { AppProps /*, AppContext */ } from "next/app";
import { useRouter } from "next/router";
import React from "react";
import "../styles/baseClass.scss";
import "../styles/globals.scss";
import "../styles/keyFrame.scss";

function App({ Component, pageProps }: AppProps) {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // App.getInitialProps = async (appContext: AppContext) => {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);

  //   return { ...appProps }
  // }
  const router = useRouter();
  const { user } = pageProps;
  return (
    <>
      {router.pathname.includes("/admin") ? (
        <UserProvider user={user}>
          <Component {...pageProps} />
        </UserProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default App;
