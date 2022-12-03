import { Text } from "@parssa/universal-ui";
import { DocsBreadcrumbs } from "components/docs/DocsBreadcrumbs";
import { useLocation } from "hooks";
import Link from "next/link";
import React from "react";
import { cx } from "utils";

type NavProps = React.HTMLAttributes<HTMLDivElement>;

export const Nav = ({ ...props }: NavProps & {}) => {
  const location = useLocation();

  const isDocs = location.startsWith("/docs");

  return (
    <nav
      {...props}
      className={cx(
        `border-b border-theme-base/20 sticky top-0 z-10 bg-theme-base/20 backdrop-blur-md`,
        props.className
      )}
    >
      <div className="container">
        <div className="py-4">
          <Link href="/">
            <Text variant="h5">Universal UI</Text>
          </Link>
        </div>
        {isDocs && (
          <div className="py-2 border-t border-theme-base lg:hidde">
            <DocsBreadcrumbs />
          </div>
        )}
      </div>
    </nav>
  );
};
