import React from "react";
import { Button, Card, Text, ThemeProvider } from "@parssa/universal-ui";

export const DarkMode = ({ ...props }: DivProps & {}) => {
  return (
    <div className="container py-size-8y relative">
      <div className="grid gap-size-2x lg:grid-cols-2">
        <div className="max-w-lg">
          <Text variant="h2" className="text-3xl">
            Dark Mode out of the box
          </Text>
          <Text variant="h3" className="opacity-80 mb-size-4y">
            Interfaces that work in any theme
          </Text>
          <Text>
            All components are fully compatible with light and dark mode.
            <br /> <br />
            If you want to force a specific theme, any section of your app can be forced into a
            certain theme with{" "}
            <Text variant="code" size="sm">
              data-override="true"
            </Text>
            .
          </Text>
        </div>
        <div>
          <ThemeProvider
            // data-dark="false"
            data-theme="neutral"
            data-override="true"
            inverted
            className="bg-theme-pure border border-theme-base/20 grid place-items-center p-size-2x rounded-xl grid-pattern"
          >
            <Card className="bg-theme-base w-full">
              <Card.Content>
                <Text className="mb-size-y" variant="h2">
                  Inverted Section
                </Text>
                <Text>This entire section has been inverted to whatever the device theme is.</Text>
                <Text className="mt-size-2y">
                  All components inside will respect the styling for it as well, <br />
                  <span className="font-medium underline underline-offset-2">
                    without props/context passed around
                  </span>
                  .
                </Text>
                <div className="flex gap-size-x mt-size-2y justify-end">
                  <Button variant="ghost">Cancel</Button>
                  <Button theme="brand">Got it</Button>
                </div>
              </Card.Content>
            </Card>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};
