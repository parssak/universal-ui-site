import React from "react";
import { Text, ThemeProvider } from "@parssa/universal-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { cx, isSSR } from "utils";
import { NAV_SECTIONS } from "./constants";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

const NavItem = ({ item }: { item: (typeof NAV_SECTIONS)[number]["items"][number] }) => {
  const router = useRouter();

  const isActive = router.asPath.split("#")[0] === item.href.split("#")[0];

  const getTheme = () => {
    if (!isActive) return "neutral";
    if (item.href.includes("getting")) return "brand";
    if (item.href.includes("utilities")) return "info";
    return "warning";
  };

  const expiryMs = 14 * 24 * 60 * 60 * 1000; /** 14 DAYS */

  const isNew = () => {
    if (!item.dateAdded) return false;
    const now = new Date().getTime();
    const dateAdded = new Date(item.dateAdded).getTime();
    return now - dateAdded < expiryMs;
  };

  return (
    <ThemeProvider theme={getTheme()}>
      <Link
        href={item.href}
        className={cx(
          "flex items-center justify-between pl-size-2x pr-size-hy py-size-hy rounded group hover:transition-colors duration-100",
          isActive ? "bg-theme-active " : "border-transparent  hover:bg-theme-active/50"
        )}
      >
        <Text
          as="span"
          size="sm"
          className={cx(
            "group-hover:transition-all duration-100 select-none",
            isActive ? "text-theme-active" : "opacity-80 group-hover:opacity-100 text-theme-active"
          )}
        >
          {item.title}
        </Text>
        {isNew() && (
          <div
            data-size="xs"
            className={`px-size-2x py-size-y text-size font-mono font-medium border-theme-active rounded ${
              isActive ? "bg-theme-muted" : "bg-theme-muted"
            }`}
          >
            NEW
          </div>
        )}
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
        "bg-theme-pure",
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
