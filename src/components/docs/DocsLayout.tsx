import React from "react";
import { Sidebar } from "./Sidebar";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export const DocsLayout = ({ ...props }: DivProps & {}) => {
  return (
    <div className="flex w-full h-full flex-1">
      <Sidebar className="hidden md:block" />
      <div className="w-full flex-1 ">
        <div className="container py-12">{props.children}</div>
      </div>
    </div>
  );
};
