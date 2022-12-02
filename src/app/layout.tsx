"use client";

import { ThemeProvider, UniversalUIConfigProvider } from "@parssa/universal-ui";
import { Footer } from "components/global/Footer";
import { Nav } from "components/global/Nav";
import "styles/index.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <UniversalUIConfigProvider
          value={{
            components: {
              text: ({ variant }) => {
                switch (variant) {
                  case "h6":
                    return "uppercase tracking-wider";
                }
                return "";
              }
            },
            ssr: true
          }}
        >
          <ThemeProvider className="bg-theme-pure">
            <div className="min-h-screen relative">
              <Nav />
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </UniversalUIConfigProvider>
      </body>
    </html>
  );
}
