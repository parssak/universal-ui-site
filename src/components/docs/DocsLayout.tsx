import { Disclosure } from "@headlessui/react";
import { ThemeProvider } from "@parssa/universal-ui";
import { Footer } from "components/global/layout/Footer";
import React from "react";
import { Sidebar } from "./Sidebar";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export const DocsLayout = ({ ...props }: DivProps & {}) => {
  const accents = [
    "top-96 right-0 opacity-20 rounded-full rotate-45 from-theme-base/50 to-theme-active w-96 h-24",
    "top-48 -right-56 opacity-40 rounded-full -rotate-6 from-theme-active/90 to-theme-base/50 w-96 h-12",
    "top-6 -left-48 opacity-40 rounded-full -rotate-12  from-theme-base/25 to-theme-active/50 w-96 h-16",
    "top-0 left-48 opacity-40 rounded-full rotate-[36deg] from-theme-base/50 to-theme-active w-96 h-24",
    "bottom-48 right-0 opacity-20 rounded-full rotate-45 from-theme-base/50 to-theme-active w-96 h-24",
    "bottom-8 -right-56 opacity-40 rounded-full -rotate-6 from-theme-active/90 to-theme-base/50 w-96 h-12",
    "bottom-96 -left-24 opacity-60 rounded-full -rotate-45  from-theme-base/25 to-theme-active/50 w-96 h-16",
    "bottom-24 left-6 opacity-40 rounded-full rotate-[36deg] from-theme-base/50 to-theme-active w-96 h-24"
  ];
  return (
    <div className="flex w-full h-full flex-1 ">
      {/* <div className="fixed h-full bottom-0 top-28 bg-red-500">
      </div> */}

      <Sidebar className="hidden lg:block fixed h-full bottom-0 top-14 " />
      <div className="hidden lg:block w-56 xl:w-64"></div>
      <div className="w-full flex-1 overflow-hidden">
        <div className="container py-12 relative min-h-screen">
          <ThemeProvider theme="brand" className="opacity-80">
            <div className="absolute -top-24 -inset-x-24 h-[30rem] bg-gradient-to-tr blur-lg via-theme-base/20 from-transparent to-theme-active/60 dark:to-theme-base/60"></div>
            <div className="absolute -bottom-24 -inset-x-24 h-[30rem] bg-gradient-to-bl blur-lg via-theme-base/20 from-transparent to-theme-active dark:to-theme-base/60"></div>
            {accents.map((accent, i) => (
              <div key={i} className={`absolute bg-gradient-to-r ${accent}`} aria-hidden="true" />
            ))}
          </ThemeProvider>
          <div className="relative">{props.children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
