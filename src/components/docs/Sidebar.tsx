import { Text } from "@parssa/universal-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { cx, isSSR } from "utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

const items = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Installation",
        href: "/docs/installation"
      }
    ]
  }
];

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
          {item.items.map((item) => (
            <Link key={item.title} href={item.href} className="block pl-6 py-2">
              <Text as="span">{item.title}</Text>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};
