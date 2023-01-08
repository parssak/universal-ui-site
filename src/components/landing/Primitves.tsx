import { Button, Card, Input, InputGroup, Select, Text, ThemeProvider } from "@parssa/universal-ui";
import { DocsComponent } from "components/docs/DocsComponent";
import { Footer } from "components/global/layout/Footer";
import Link from "next/link";
import { useState } from "react";
import { HiCheck, HiOutlineClipboard } from "react-icons/hi";
import { isSSR } from "utils";
import * as Icon from "react-icons/hi";

export const Primitives = () => {
  const themes = ["neutral", "brand", "success", "error", "warning", "info"] as const;

  const [theme, setTheme] = useState<typeof themes[number]>("brand");

  return (
    <div className="py-size-8y bg-gradient-to-tr from-theme-pure to-theme-base/20" data-theme={theme}>
      <div className="container grid lg:grid-cols-2 gap-size-2x">
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
