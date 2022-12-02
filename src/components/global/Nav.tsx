import { Text } from "@parssa/universal-ui";
import React from "react";
import { cx } from "utils";

type NavProps = React.HTMLAttributes<HTMLDivElement>;

export const Nav = ({ ...props }: NavProps & {}) => {
  return (
    <nav
      {...props}
      className={cx([`border-b border-theme-base/20 sticky top-0 bg-theme-base/20 backdrop-blur-md`, props.className])}
    >
      <div className="container py-4">
        <Text variant="h5">Universal UI</Text>
      </div>
    </nav>
  );
};
