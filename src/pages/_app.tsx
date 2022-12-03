import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider, UniversalUIConfigProvider } from "@parssa/universal-ui";
import { Nav } from "components/global/layout/Nav";
import { Footer } from "components/global/layout/Footer";

import "styles/index.css";
import "highlight.js/styles/default.css";
// import "styles/prism.css";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        
        <title>NextJS TW</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
              return ''
            }
          }
        }}
      >
        <ThemeProvider className="bg-theme-pure">
          <div className="min-h-screen relative flex flex-col h-full">
            <Nav />
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </UniversalUIConfigProvider>
    </>
  );
}

export default MyApp;
