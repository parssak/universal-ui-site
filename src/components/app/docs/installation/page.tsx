"use client";

import { Text } from "@parssa/universal-ui";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Text variant="h1">Installation</Text>
      <Text className="mt-size-4y">
        Begin by installing{" "}
        <Text size="sm" variant="code">
          @parssa/universal-ui
        </Text>{" "}
        with your package manager of choice.
      </Text>
    </div>
  );
}
