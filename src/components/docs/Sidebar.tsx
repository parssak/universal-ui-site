import React from "react";
import { cx } from "utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export const Sidebar = ({ ...props }: DivProps & {}) => {
  return (
    <div
      {...props}
      className={cx(
        "px-4 py-12 w-52 xl:w-64 border-r",
        "bg-neutral-50 border-neutral-300",
        "dark:bg-neutral-900 dark:border-neutral-700",
        props.className
      )}
    ></div>
  );
};
