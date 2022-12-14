import React from "react";
import Link from "next/link";

import { Text } from "@parssa/universal-ui";
import { DocsBreadcrumbs } from "components/docs/DocsBreadcrumbs";

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
        `border-b border-theme-base/20 sticky top-0 z-50 bg-theme-pure/80 backdrop-blur-md`,
        props.className
      )}
    >
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4 flex items-center">
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
