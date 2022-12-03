import { Text, ThemeProvider } from "@parssa/universal-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { cx, isSSR } from "utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

const items = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Installation",
        href: "/docs/getting-started"
      }
    ]
  }
] as const;

const NavItem = ({ item }: { item: typeof items[number]["items"][number] }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const location = isSSR ? "/" : window.location.pathname;
    setIsActive(location === item.href);
  }, []);

  return (
    <ThemeProvider theme={isActive ? "brand" : "neutral"}>
      <Link
        href={item.href}
        className={cx(
          "block pl-size-2x py-size-qy rounded ",
          isActive ? "bg-theme-active " : "border-transparent"
        )}
      >
        <Text as="span" size="sm" className={cx("", isActive && "text-theme-active")}>
          {item.title}
        </Text>
      </Link>
    </ThemeProvider>
  );
};

export const Sidebar = ({ ...props }: DivProps & {}) => {
  const location = isSSR ? "/" : window.location.pathname;

  return (
    <div
      {...props}
      className={cx(
        "px-4 py-12 w-52 xl:w-64 border-r",
        "bg-neutral-50 border-neutral-300",
        "dark:bg-neutral-900 dark:border-neutral-700",
        props.className
      )}
    >
      {items.map((item) => (
        <div className="flex flex-col" key={item.title}>
          <Text className="opacity-80" variant="h6">
            {item.title}
          </Text>
          <div className="mt-1">
            {item.items.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
