import React from "react";
import { Text, ThemeProvider } from "@parssa/universal-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { cx, isSSR } from "utils";
import { NAV_SECTIONS } from "./constants";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

const NavItem = ({ item }: { item: typeof NAV_SECTIONS[number]["items"][number] }) => {
  const router = useRouter();

  const isActive = router.asPath.split("#")[0] === item.href.split("#")[0];

  return (
    <ThemeProvider theme={isActive ? "brand" : "neutral"}>
      <Link
        href={item.href}
        className={cx(
          "block pl-size-2x py-size-hy rounded group",
          isActive
            ? "bg-theme-active "
            : "border-transparent transition-all duration-100 hover:bg-theme-active/50"
        )}
      >
        <Text
          as="span"
          size="sm"
          className={cx(
            "transition-all duration-100",
            isActive ? "text-theme-active" : "opacity-80 group-hover:opacity-100 text-theme-active"
          )}
        >
          {item.title}
        </Text>
      </Link>
    </ThemeProvider>
  );
};

export const Sidebar = ({ children, ...props }: DivProps & {}) => {
  return (
    <div
      {...props}
      className={cx(
        "px-4 py-8 flex-shrink-0 border-r ",
        "bg-theme-base dark:bg-theme-pure",
        "border-theme-base/30",
        props.className
      )}
    >
      {children}
      {NAV_SECTIONS.map((item) => (
        <div className="flex flex-col" key={item.title}>
          <Text className="opacity-50 mt-6" variant="h6">
            {item.title}
          </Text>
          <div className="mt-2 space-y-0.5">
            {item.items.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
