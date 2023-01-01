import React from "react";

import { Text, ThemeProvider } from "@parssa/universal-ui";
import { Footer } from "components/global/layout/Footer";
import { DocsHeader } from "./DocsHeader";
import { Sidebar } from "./Sidebar";
import { Dialog } from "@headlessui/react";
import { useSidebar } from "hooks/useSidebar";
import Link from "next/link";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

const DocsLayoutRoot = ({ ...props }: DivProps & {}) => {
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
  return (
    <div className="flex w-full h-full flex-1 ">
      <Sidebar className="hidden lg:block absolute h-full bottom-0 pt-24" />

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
      <div className="w-full flex-1 overflow-hidden">
        <div className="container py-12 relative min-h-screen subpixel-antialiased">
          <ThemeProvider theme="neutral" className="opacity-80">
            <div className="absolute -top-24 -inset-x-24 h-[30rem] bg-gradient-to-tr blur-lg via-theme-base/20 from-transparent to-theme-active/60 dark:to-theme-base/60"></div>
            <div className="absolute -bottom-24 -inset-x-24 h-[30rem] bg-gradient-to-bl blur-lg via-theme-base/20 from-transparent to-theme-active dark:to-theme-base/60"></div>
            <div className="opacity-80 dark:opacity-20">
              {accents.map((accent, i) => (
                <div key={i} className={`absolute bg-gradient-to-r ${accent}`} aria-hidden="true" />
              ))}
            </div>
          </ThemeProvider>
          <ThemeProvider className="relative flex">
            <div className="max-w-4xl flex-1">{props.children}</div>
            <div className="fixed pointer-events-none z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[16.5rem] py-10 overflow-y-auto hidden 2xl:block">
              <Text variant="h6">On this page</Text>
            </div>
          </ThemeProvider>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export const DocsLayout = Object.assign(DocsLayoutRoot, {
  Header: DocsHeader
});
