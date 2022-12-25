import React from "react";

import { Text, ThemeProvider } from "@parssa/universal-ui";
import { Footer } from "components/global/layout/Footer";
import { DocsHeader } from "./DocsHeader";
import { Sidebar } from "./Sidebar";
import { Dialog, Transition } from "@headlessui/react";
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
      <Sidebar className="hidden lg:block fixed h-full bottom-0 top-14 " />

      <Transition
        show={isSidebarOpen}
        enter=""
        enterFrom=""
        enterTo=""
        leave=""
        leaveFrom=""
        leaveTo=""
      >
        <Dialog
          open={isSidebarOpen}
          onClose={() => {
            console.log("close");
            toggleSidebar();
          }}
        >
          <Dialog.Overlay className="fixed inset-0 bg-theme-pure/80 dark:bg-theme-base/50 lg:hidden" />
          <Dialog.Panel className="lg:hidden fixed h-full bottom-0 top-0 z-50 bg-theme-pure dark:bg-theme-pure">
            <div className="px-4 pt-8 pb-4">
              <Link href="/">
                <Text variant="h5">Universal UI</Text>
              </Link>
            </div>
            <Sidebar
              className="bg-theme-pure dark:bg-theme-pure"
              onClickCapture={(e) => {
                if (e.target instanceof HTMLElement && e.target.tagName === "A") {
                  toggleSidebar();
                }
              }}
            />
          </Dialog.Panel>
        </Dialog>
      </Transition>
      <div className="hidden lg:block w-56 xl:w-64"></div>
      <div className="w-full flex-1 overflow-hidden">
        <div className="container py-12 relative min-h-screen">
          <ThemeProvider theme="brand" className="opacity-80">
            <div className="absolute -top-24 -inset-x-24 h-[30rem] bg-gradient-to-tr blur-lg via-theme-base/20 from-transparent to-theme-active/60 dark:to-theme-base/60"></div>
            <div className="absolute -bottom-24 -inset-x-24 h-[30rem] bg-gradient-to-bl blur-lg via-theme-base/20 from-transparent to-theme-active dark:to-theme-base/60"></div>
            <div className="opacity-80 dark:opacity-50">
              {accents.map((accent, i) => (
                <div key={i} className={`absolute bg-gradient-to-r ${accent}`} aria-hidden="true" />
              ))}
            </div>
          </ThemeProvider>
          <div className="relative">{props.children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export const DocsLayout = Object.assign(DocsLayoutRoot, {
  Header: DocsHeader
});
