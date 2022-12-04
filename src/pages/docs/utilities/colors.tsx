import { Card, Text, ThemeProvider } from "@parssa/universal-ui";
import { DocsLayout } from "components/docs/DocsLayout";
import { CodeBlock } from "components/global/ui/CodeBlock";

import Link from "next/link";

export default function Colors() {
  const themes = ["neutral", "brand", "error", "warning", "success", "info"] as const;
  return (
    <DocsLayout>
      <Text variant="h1">Colors</Text>

      <Text className="mt-size-4y">
        All the default colors provided by Universal UI are listed below. You can also override
        these colors in the{" "}
        <Text variant="code" size="sm">
          tailwind.config.js
        </Text>
        {", "}
        <Link href="/docs/getting-started/customization" className="link">
          go here to learn more
        </Link>
        .
      </Text>

      {themes.map((theme) => (
        <ThemeProvider key={theme} theme={theme} className="mt-size-4y">
          <Text className="capitalize mb-size-2y" variant="h2">
            {theme}
          </Text>
          <div className="py-size-2y md:py-size-4y px-size-2x mt-size-y rounded bg-theme-pure border border-theme-base flex w-full justify-between">
            <Text className="font-medium">Pure </Text>
            <div className="ml-auto pl-4">
              <Text variant="code" size="sm">
                bg-theme-pure
              </Text>
            </div>
          </div>
          <div className="py-size-2y md:py-size-4y px-size-2x mt-size-y rounded bg-theme-base border border-theme-base flex w-full justify-between">
            <Text className="font-medium">Base </Text>
            <div className="ml-auto pl-4">
              <Text variant="code" size="sm">
                bg-theme-base
              </Text>
            </div>
          </div>
          <div className="py-size-2y md:py-size-4y px-size-2x mt-size-y rounded bg-theme-active border border-theme-active flex w-full justify-between">
            <Text className="text-theme-active font-medium">Active </Text>
            <div className="ml-auto pl-4">
              <Text variant="code" size="sm">
                bg-theme-active
              </Text>
            </div>
          </div>
          <div className="py-size-2y md:py-size-4y px-size-2x mt-size-y rounded bg-theme-inverted border border-theme-inverted flex w-full justify-between">
            <Text className="text-theme-inverted font-medium">Inverted </Text>
            <div className="ml-auto pl-4">
              <Text variant="code" size="sm">
                bg-theme-inverted
              </Text>
            </div>
          </div>
        </ThemeProvider>
      ))}
    </DocsLayout>
  );
}
