import { Card, Text, ThemeProvider } from "@parssa/universal-ui";
import { DocsLayout } from "components/docs/DocsLayout";
import { CodeBlock } from "components/global/ui/CodeBlock";

import Link from "next/link";
import { isSSR } from "utils";

export default function Spacing() {
  const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

  return (
    <DocsLayout>
      <Text variant="h1">Spacing</Text>

      <Text className="mt-size-4y">
        Universal UI provides a set of spacing utilities to help you quickly add margin and padding
        with TailwindCSS.
      </Text>

      {sizes.map((size) => (
        <div key={size} className="mt-size-2y">
          <div data-size={size} className="flex items-center gap-size-x">
            <Text className="font-mono">size-{size}</Text>
            <div className="bg-theme-active h-size-4y w-size-4x rounded-sm"></div>
            {/* <div className="px-size-x py-size-y bg-theme-active rounded w-max">
              <Text className="font-mono">size-{size}</Text>
            </div> */}
          </div>
        </div>
      ))}
    </DocsLayout>
  );
}
