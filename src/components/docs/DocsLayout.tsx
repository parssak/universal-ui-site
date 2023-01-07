import React from "react";

import { Text, ThemeProvider, UniversalUIConfigProvider } from "@parssa/universal-ui";
import { Footer } from "components/global/layout/Footer";
import { DocsHeader } from "./DocsHeader";
import { Sidebar } from "./Sidebar";
import { Dialog } from "@headlessui/react";
import { useSidebar } from "hooks/useSidebar";
import Link from "next/link";
import { renderToString } from "react-dom/server";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useRouter } from "next/router";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

const getHeadings = (source: string) => {
  const classHeadingRegex = /<h[2-6](.*?)>(.*?)<\/h[2-6]>/g;

  if (source.match(classHeadingRegex)) {
    return source.match(classHeadingRegex).map((heading) => {
      const headingText = heading.replace(/<h[2-6](.*?)>/g, "").replace(/<\/h[2-6]>/g, "");

      const headingProps =
        heading
          .match(/<h[2-6](.*?)>/g)?.[0]
          .replace(/<h[2-6]/g, "")
          .replace(/>/g, "") || "";

      const link = "#" + headingText.replace(/ /g, "_").toLowerCase();

      const headingLevel = heading.match(/<h[2-6]/g)?.[0].replace(/<h/g, "") || "2";

      return {
        text: headingText,
        link,
        props: headingProps.trim(),
        level: headingLevel
      };
    });
  }

  return [];
};

const extractChildrenFromHeadings = (children: any) => {
  // if (process.env.NODE_ENV === "development") return [];
  const str = renderToString(<RadixTooltip.Provider>{children}</RadixTooltip.Provider>);
  return getHeadings(str);
};

const DocsLayoutRoot = ({ children, ...props }: DivProps & {}) => {
  const { toggleSidebar, isSidebarOpen } = useSidebar();
  const accents = [
    "top-96 right-0 opacity-20 rounded-full rotate-45 from-theme-base/50 to-theme-active w-96 h-24",
    "top-48 -right-56 opacity-40 blur rounded-full -rotate-6 from-theme-active/90 to-theme-base/50 w-96 h-12",
    "top-6 -left-48 opacity-40 rounded-full -rotate-12  from-theme-base/25 to-theme-active/50 w-96 h-16",
    "top-0 left-48 opacity-40 rounded-full rotate-[36deg] from-theme-base/50 to-theme-active w-96 h-24",
    "bottom-48 right-0 opacity-20 rounded-full rotate-45 from-theme-base/50 to-theme-active w-96 h-24",
    "bottom-8 -right-56 opacity-40 blur rounded-full -rotate-6 from-theme-active/90 to-theme-base/50 w-96 h-12",
    "bottom-96 -left-24 opacity-60 rounded-full -rotate-45  from-theme-base/25 to-theme-active/50 w-96 h-16",
    "bottom-24 left-6 opacity-40 rounded-full rotate-[36deg] from-theme-base/50 to-theme-active w-96 h-24"
  ];

  const levelToMarginMap = {
    2: "ml-0",
    3: "ml-2",
    4: "ml-4",
    5: "ml-6",
    6: "ml-8"
  };

  const headings = extractChildrenFromHeadings(children);
  const router = useRouter();

  const routeThemeMap = {
    "getting-started": "brand",
    components: "neutral",
    utilities: "info"
  };

  const theme = routeThemeMap[router.pathname.split("/")[2]] || "info";

  return (
    <div
      {...props}
      className="flex w-full h-full flex-1 max-w-[90rem] mx-auto  overflow-hidden relative"
    >
      <Sidebar className="hidden lg:block fixed h-full top-0 bottom-0 pt-24 overflow-auto w-[15rem] z-10" />

      {isSidebarOpen && (
        <Dialog open={isSidebarOpen} onClose={toggleSidebar}>
          <Dialog.Overlay className="fixed inset-0 h-full bg-black/70 z-50 lg:hidden" />
          <ThemeProvider>
            <Dialog.Panel>
              <Sidebar
                className="lg:hidden fixed h-full bottom-0 top-0 z-50 bg-theme-pure w-2/3 dark:bg-theme-pure"
                onClickCapture={(e) => {
                  if (e.target instanceof HTMLElement && e.target.tagName === "A") {
                    toggleSidebar();
                  }
                }}
              >
                <Link href="/">
                  <Text variant="h5">Universal UI</Text>
                </Link>
              </Sidebar>
            </Dialog.Panel>
          </ThemeProvider>
        </Dialog>
      )}
      <ThemeProvider theme={theme} className="opacity-80 pointer-events-none select-none">
        <div className="absolute top-0 -inset-x-0 h-[30rem] bg-gradient-to-tr blur-lg via-theme-base/20 from-transparent to-theme-active/60 dark:to-theme-base/60"></div>
        <div className="absolute bottom-0 -inset-x-0 h-[30rem] bg-gradient-to-bl blur-lg via-theme-base/20 from-transparent to-theme-active dark:to-theme-base/60"></div>
        <div className="opacity-80 dark:opacity-20">
          {accents.map((accent, i) => (
            <div key={i} className={`absolute bg-gradient-to-r ${accent}`} aria-hidden="true" />
          ))}
        </div>
      </ThemeProvider>
      <div className="w-full flex-1 flex flex-col lg:pl-[15rem] relative">
        <div className="min-h-screen subpixel-antialiased max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[16.5rem] ">
          <ThemeProvider className="px-6 pb-12">
            {children}
          </ThemeProvider>
          <div className="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[16.5rem] py-10 overflow-y-auto hidden xl:block">
            <Text size="sm" variant="h6">
              On this page
            </Text>
            <ul className="mt-4 space-y-2 pointer-events-auto">
              {headings.map((heading) => (
                <li key={heading.text}>
                  <Link href={heading.link} className="group">
                    <Text
                      size="sm"
                      className={`${levelToMarginMap[heading.level]} text-theme-muted `}
                    >
                      {heading.text}
                    </Text>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Footer className="mt-auto" />
      </div>
    </div>
  );
};

export const DocsLayout = Object.assign(DocsLayoutRoot, {
  Header: DocsHeader
});
