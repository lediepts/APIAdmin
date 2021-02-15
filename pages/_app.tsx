import React from "react";
import "../styles/globals.scss";
import "../styles/baseClass.scss";
import "../styles/keyFrame.scss";
import type { AppProps /*, AppContext */ } from "next/app";

function App({ Component, pageProps }: AppProps) {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // MyApp.getInitialProps = async (appContext: AppContext) => {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);

  //   return { ...appProps }
  // }
  return <Component {...pageProps} />;
}

export default App;
