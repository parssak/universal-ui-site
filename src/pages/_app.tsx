import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider, UniversalUIConfigProvider } from "@parssa/universal-ui";
import { Nav } from "components/global/layout/Nav";
import { Footer } from "components/global/layout/Footer";

import "styles/index.css";
import "highlight.js/styles/default.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NextJS TW</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <UniversalUIConfigProvider
        value={{
          components: {
            text: ({ variant, size }) => {
              switch (variant) {
                case "p":
                  if (size === "md") {
                    return "leading-relaxed";
                  }
                  return "";
                case "h6":
                  return "uppercase tracking-wider text-xs";
                default:
                  return "";
              }
            }
          }
        }}
      >
        <ThemeProvider className="bg-theme-pure">
          <div className="min-h-screen relative flex flex-col h-full">
            <Nav />
            <Component {...pageProps} />
          </div>
          <Footer />
        </ThemeProvider>
      </UniversalUIConfigProvider>
    </>
  );
}

export default MyApp;
