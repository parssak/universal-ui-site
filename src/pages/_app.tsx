import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider, UniversalUIConfigProvider } from "@parssa/universal-ui";
import { Nav } from "components/global/layout/Nav";

import "styles/index.css";

import { SidebarProvider } from "hooks/useSidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Universal UI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="A customizable, TailwindCSS-first, React UI Library." />
        {/* og:image */}
        <meta property="og:title" content="Universal UI" />
        <meta
          property="og:description"
          content="A customizable, TailwindCSS-first, React UI Library."
        />
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
              // if (variant === 'solid' || !variant) {
              //   return "bg-gradient-to-t from-theme-base to-theme-active/40 border-0";
              // }
              if (variant === "ghost") {
                return "shadow-none";
              }
              return "";
            }
          }
        }}
      >
        <ThemeProvider className="bg-theme-pure">
          <div className="min-h-screen relative flex flex-col h-full">
            <SidebarProvider>
              <Nav />
              <Component {...pageProps} />
            </SidebarProvider>
          </div>
        </ThemeProvider>
      </UniversalUIConfigProvider>
    </>
  );
}

export default MyApp;
