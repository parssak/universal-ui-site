import { Button, Card,  InputGroup, Select, Text } from "@parssa/universal-ui";
import Link from "next/link";
import { useState } from "react";
import * as Icon from "react-icons/hi";

export const Primitives = () => {
  const themes = ["neutral", "brand", "success", "error", "warning", "info"] as const;

  const [theme, setTheme] = useState<typeof themes[number]>("brand");

  return (
    <div className="py-size-8y relative" data-theme={theme}>
      {themes.map((t) => (
        <div
          key={t}
          className={`transition-opacity absolute inset-0 bg-gradient-to-tr from-theme-pure to-theme-base/80 dark:to-theme-base/50 
          ${t === theme ? "opacity-100 duration-200 z-10" : "opacity-0 duration-200"}`}
          data-theme={t}
        />
      ))}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t z-[11] from-theme-pure to-transparent"></div>
      <div className="container grid lg:grid-cols-2 gap-size-2x relative z-20">
        <div className="lg:order-2">
          <Text variant="h2" className="text-3xl">
            Powerful Primitives
          </Text>
          <Text variant="h3" className="opacity-80">
            TailwindCSS primitives for consistent interfaces
          </Text>

          <Text className="mt-size-4y">
            Comes with built-in TailwindCSS primitives for consistent styling across your project.
            <br />
            Primitives are built on{" "}
            <Text variant="code" size="sm">
              var(--css-variables)
            </Text>{" "}
            and work with data-attributes.
          </Text>
          <Button
            trailingIcon={
              <Icon.HiArrowRight className="w-full h-full transition-transform transform group-hover:translate-x-1" />
            }
            as={Link}
            href="/docs/utilities/colors"
            className="mt-size-4y group"
          >
            See all primitives
          </Button>
        </div>
        <div className="lg:order-1">
          <div className="lg:max-w-lg mx-auto font-mono ">
            <Card className="overflow-hidden">
              <Card.Content className="bg-theme-pure">{`bg-theme-pure`}</Card.Content>
              <Card.Content className="bg-theme-base">{`bg-theme-base`}</Card.Content>
              <Card.Content className="bg-theme-active">{`bg-theme-active`}</Card.Content>
            </Card>
            <Text size="sm" className="mt-size-4y">
              Theme:
            </Text>
            <Select value={theme} onValueChange={(v) => setTheme(v as any)} theme={theme}>
              <Select.Trigger className="w-full mt-size-y xl:hidden" />
              <Select.Panel>
                {themes.map((t) => (
                  <Select.Item key={t} value={t} theme={t}>
                    {t}
                  </Select.Item>
                ))}
              </Select.Panel>
            </Select>

            <div className="hidden xl:block">
              <InputGroup className="mt-size-y w-full">
                {themes.map((t) => (
                  <Button
                    key={t}
                    theme={t}
                    onClick={() => setTheme(t)}
                    className={`
                    w-full
                  ${
                    t === theme
                      ? "bg-theme-active text-theme-active"
                      : "text-theme-muted saturate-0 transition-all hover:saturate-100"
                  }
                  `}
                  >
                    {t}
                  </Button>
                ))}
              </InputGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
