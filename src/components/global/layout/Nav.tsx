import { Text } from "@parssa/universal-ui";
import { DocsBreadcrumbs } from "components/docs/DocsBreadcrumbs";

import Link from "next/link";
import React from "react";
import { cx } from "utils";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/router";
import { useSidebar } from "hooks/useSidebar";

type NavProps = React.HTMLAttributes<HTMLDivElement>;

export const Nav = ({ ...props }: NavProps & {}) => {
  const router = useRouter();
  const isDocs = router.asPath.startsWith("/docs");

  return (
    <nav
      {...props}
      className={cx(
        `border-b border-theme-base/20 sticky top-0 z-10 bg-theme-base/20 backdrop-blur-md px-4 lg:px-0`,
        props.className
      )}
    >
      <div className="">
        <div className="lg:mx-56 xl:mx-64 py-4 flex items-center">
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
              <span className="sr-only">Link to GitHub Project</span>
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
