import { Text } from "@parssa/universal-ui";
import { DocsBreadcrumbs } from "components/docs/DocsBreadcrumbs";

import Link from "next/link";
import React from "react";
import { cx } from "utils";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/router";

type NavProps = React.HTMLAttributes<HTMLDivElement>;

export const Nav = ({ ...props }: NavProps & {}) => {
  const router = useRouter();
  const isDocs = router.asPath.startsWith("/docs");

  return (
    <nav
      {...props}
      className={cx(
        `border-b border-theme-base/20 sticky top-0 z-10 bg-theme-base/20 backdrop-blur-md`,
        props.className
      )}
    >
      <div className="container">
        <div className="py-4 flex items-center w-full">
          <Link href="/">
            <Text variant="h5">Universal UI</Text>
          </Link>
          <div className="ml-auto">
            <a
              data-size="xl"
              href="https://github.com/parssak/universal-ui"
              target="_blank"
              className="group"
            >
              <FaGithub className="text-size group-hover:text-theme-active text-theme-base group-hover:opacity-100 transition-all opacity-70" />
            </a>
          </div>
        </div>
        {isDocs && (
          <div className="py-2 border-t border-theme-base/30 lg:hidden">
            <DocsBreadcrumbs />
          </div>
        )}
      </div>
    </nav>
  );
};
