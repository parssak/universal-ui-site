import Head from "next/head";
import { AppProps } from "next/app";
import {  UniversalUIConfigProvider } from "@parssa/universal-ui";
import { Nav } from "components/global/layout/Nav";

import "styles/index.css";
// import "highlight.js/styles/default.css";
// import "styles/prism.css";

function MyApp({ Component, pageProps }: AppProps) {

  // if (typeof window === "undefined") {
  //   console.log(document)
  // }
  return (
    <>
      <Head>
        <title>Universal UI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="A customizable, TailwindCSS-first, React UI Library." />
        {/* og:image */}
        <meta property="og:title" content="Universal UI" />
        <meta property="og:description" content="A customizable, TailwindCSS-first, React UI Library." />
        <meta property="og:image" content="https://universal-ui.vercel.app/meta.png" />
        {/* Prevent dark mode flicker, add data-theme="neutral-dark" if client is in dark mode */}
        <meta name="color-scheme" content="light dark" />
        
      </Head>
      <UniversalUIConfigProvider
        config={{
          components: {
            text: ({ variant, size }) => {
              switch (variant) {
                case "p":
                  if (size === undefined) {
                    return "leading-relaxed";
                  }
                  return "";
                case "h6":
                  return "uppercase tracking-widest text-xs font-mono";
                default:
                  return "";
              }
            },
            button: ({ variant }) => {
              if (variant === "ghost") {
                return "shadow-none";
              }
              return "";
            }
          }
        }}
      >
        {/* <ThemeProvider className="bg-theme-pure"> */}
          <div className="min-h-screen relative flex flex-col h-full">
            <Nav />
            <Component {...pageProps} />
          </div>
        {/* </ThemeProvider> */}
      </UniversalUIConfigProvider>
    </>
  );
}

export default MyApp;
