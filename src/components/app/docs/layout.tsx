"use client";

import { Text } from "@parssa/universal-ui";
import Link from "next/link";

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

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full">
      {items.map((item) => (
        <div className="flex flex-col" key={item.title}>
          <Text variant="h6">{item.title}</Text>
          {item.items.map((item) => (
            <Link key={item.title} href={item.href} className="block px-2 py-1">
              {item.title}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full container px-0 h-full flex-1">
      <div className="hidden md:block w-64 bg-theme-active py-6 px-4">
        <Sidebar />
      </div>
      <div className="w-full flex-1 py-6">
        <div className="container">{children}</div>
      </div>
    </div>
  );
}
