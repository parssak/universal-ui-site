import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Text, ThemeProvider, UniversalUIConfigProvider } from "@parssa/universal-ui";
import { Nav } from "components/global/layout/Nav";
import { Analytics } from "@vercel/analytics/react";

import "styles/index.css";

import { SidebarProvider } from "hooks/useSidebar";
import { MDXProvider } from "components/global/ui/MDXProvider";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  const { pathname } = useRouter();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    setTimeout(() => document.body.scrollTo(0, 0), 0);
  }, [pathname]);

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
      <div
        style={{
          visibility: mounted ? "visible" : "hidden"
        }}
      >
        <UniversalUIConfigProvider
          config={{
            components: {
              text: ({ variant, size }) => {
                switch (variant) {
                  case "p":
                    if (size == undefined) {
                    }
                    return "leading-relaxed";
                  case "h2":
                    return "text-2xl font-medium";
                  case "h3":
                    return "text-xl font-medium";
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
              },
              "tooltip.content": "backdrop-blur-sm",
              "select.panel": "z-[60]"
            }
          }}
        >
          <div className="min-h-screen relative flex flex-col h-full">
            <SidebarProvider>
              <MDXProvider>
                <Nav />
                {/* @ts-ignore */}
                <Component {...pageProps} />
              </MDXProvider>
            </SidebarProvider>
          </div>
        </UniversalUIConfigProvider>
      </div>
      <Analytics />
    </>
  );
}

export default MyApp;
