import { useState } from "react";
import { Button, Card, Text, ThemeProvider } from "@parssa/universal-ui";
import Link from "next/link";
import { HiCheck, HiOutlineClipboard } from "react-icons/hi";
import { isSSR } from "utils";
import * as Icon from "react-icons/hi";

export const Hero = () => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    if (isSSR) return;
    navigator.clipboard.writeText("npm i @parssa/universal-ui");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <ThemeProvider className="bg-theme-pure relative overflow-hidden grid-pattern py-24">
      <ThemeProvider
        theme="brand"
        className="absolute mix-blend-multiply dark:mix-blend-normal -top-24 -inset-x-12 h-[26rem] bg-gradient-to-tr  blur-3xl via-theme-base/20 from-transparent to-theme-active dark:to-theme-base/80 dark:opacity-60 pointer-events-none"
      />

      <ThemeProvider
        theme="info"
        className="mix-blend-multiply dark:mix-blend-normal absolute -bottom-24 -inset-x-12 h-[26rem] bg-gradient-to-bl  blur-3xl via-theme-base/20 from-transparent to-theme-active dark:to-theme-base/80 dark:opacity-60 pointer-events-none"
      />
      <div className="absolute inset-0 with-spotlight pointer-events-none" />
      <div className="container  flex-1 grid place-items-center">
        <div className="flex flex-col items-center text-center relative">
          <Card theme="warning" className="rounded mb-6 w-max" size="xs">
            <Card.Content>
              <Text className="font-medium">
                🚧 This library (& docs) are under active development
              </Text>
            </Card.Content>
          </Card>

          <Text className="text-5xl gradient-text-subtle" variant="h1">
            Universal UI
          </Text>
          <Text className="mb-size-4y mt-size-y" variant="h4">
            A customizable, TailwindCSS-first, React UI Library.
          </Text>

          <Text>
            Build beautiful & customizable interfaces with TailwindCSS-first React components.
          </Text>
          <div className="flex flex-col md:flex-row md:items-center gap-size-x mt-size-4y">
            <Button
              theme="brand"
              as={Link}
              href="/docs"
              className="group justify-center"
              trailingIcon={
                <Icon.HiArrowRight className="w-full h-full transition-transform transform group-hover:translate-x-1" />
              }
            >
              Get Started
            </Button>
            <Button
              className="font-mono cursor-copy"
              variant="outline"
              theme={copied ? "success" : "neutral"}
              trailingIcon={
                copied ? (
                  <HiCheck className="w-full h-full" />
                ) : (
                  <HiOutlineClipboard className="w-full h-full" />
                )
              }
              onClick={onCopy}
            >
              npm i @parssa/universal-ui
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
