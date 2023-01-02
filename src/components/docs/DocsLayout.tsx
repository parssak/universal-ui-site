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
  if (process.env.NODE_ENV === "development") return []
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

  return (
    <div {...props} className="flex w-full h-full flex-1">
      <Sidebar className="hidden lg:block fixed h-full top-0 bottom-0 pt-24 overflow-auto" />

      {isSidebarOpen && (
        <Dialog open={isSidebarOpen} onClose={toggleSidebar}>
          <Dialog.Overlay className="fixed inset-0 h-full bg-theme-pure/80 dark:bg-theme-pure/50 lg:hidden" />
          <ThemeProvider>
            <Dialog.Panel>
              <Sidebar
                className="lg:hidden fixed h-full bottom-0 top-0 z-50 bg-theme-pure dark:bg-theme-pure"
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
      <div className="hidden lg:block w-56 xl:w-64"></div>
      <div className="w-full flex-1 overflow-hidden flex flex-col ">
        <div className="container py-12 relative min-h-screen subpixel-antialiased">
          <ThemeProvider theme="neutral" className="opacity-80">
            <div className="absolute top-0 -inset-x-24 h-[30rem] bg-gradient-to-tr blur-lg via-theme-base/20 from-transparent to-theme-active/60 dark:to-theme-base/60"></div>
            <div className="absolute bottom-0 -inset-x-24 h-[30rem] bg-gradient-to-bl blur-lg via-theme-base/20 from-transparent to-theme-active dark:to-theme-base/60"></div>
            <div className="opacity-80 dark:opacity-20">
              {accents.map((accent, i) => (
                <div key={i} className={`absolute bg-gradient-to-r ${accent}`} aria-hidden="true" />
              ))}
            </div>
          </ThemeProvider>
          <ThemeProvider className="relative">
            <div className={headings.length > 0 ? "max-w-4xl" : 'max-w-6xl'}>{children}</div>
            {headings.length > 0 && (
              <div className="fixed pointer-events-none z-20 top-[3.8125rem] inset-x-0 bottom-0 py-10 overflow-y-auto hidden 2xl:flex">
                <div className="max-w-screen-xl p-1 w-full" />
                <div className="pl-size-4y pr-size-2x w-72">
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
            )}
          </ThemeProvider>
        </div>
        <Footer className="mt-auto" />
      </div>
    </div>
  );
};

export const DocsLayout = Object.assign(DocsLayoutRoot, {
  Header: DocsHeader
});
