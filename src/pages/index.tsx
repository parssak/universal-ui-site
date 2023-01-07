import { Button, Card, Input, InputGroup, Select, Text, ThemeProvider } from "@parssa/universal-ui";
import { DocsComponent } from "components/docs/DocsComponent";
import { Footer } from "components/global/layout/Footer";
import Link from "next/link";
import { useState } from "react";
import { HiCheck, HiOutlineClipboard } from "react-icons/hi";
import { isSSR } from "utils";
import * as Icon from "react-icons/hi";

const Primitives = () => {
  const themes = ["neutral", "brand", "success", "error", "warning", "info"] as const;

  const [theme, setTheme] = useState<typeof themes[number]>("brand");

  return (
    <div className="py-size-8y  bg-theme-base/20" data-theme={theme}>
      <div className="container grid lg:grid-cols-2 gap-size-2x">
        <div className="lg:order-2">
          <Text variant="h2" className="text-3xl">
            Primitives
          </Text>
          <Text variant="h3" className="opacity-80">
            TailwindCSS primitives for consistent UI
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
            <Select value={theme} onValueChange={v => setTheme(v as any)} theme={theme}>
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

export default function Home(props) {
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
    <div>
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

      <ThemeProvider
        className="bg-theme-pure py-size-4y border-y border-theme-active/30"
        theme="neutral"
        data-override="true"
      >
        <div className="container grid lg:grid-cols-2 gap-size-2x lg:py-size-4y">
          <div className="py-size-4y flex justify-center flex-col items-start">
            <div>
              <Text variant="h2" className="text-3xl">
                Build <b>features</b>, not UI components.
              </Text>
              <Text variant="h3" className="opacity-80">
                Scaffold your app in minutes, not hours.
              </Text>
              <Text className="max-w-lg mt-size-4y">
                Universal UI is built with accessibility, performance, and DX in mind. <br />
                <br />
                New components are added regularly, and you can always customize them to your needs.
                <br />
                <br />
                All components under the hood are built with TailwindCSS, so you can easily
                customize them to your needs, without needing to override styles with sketchy{" "}
                <Text variant="code" size="sm" theme="error">
                  !important
                </Text>{" "}
                rules.
              </Text>
            </div>

            {/* <Button
              theme="brand"
              trailingIcon={
                <Icon.HiArrowRight className="w-full h-full transition-transform transform group-hover:translate-x-1" />
              }
              as={Link}
              href="/docs"
              className="mt-size-4y group"
            >
              Get Started
            </Button> */}
          </div>
          <div className="flex justify-center flex-col ">
            <div className="relative dark:overflow-hidden">
              <div className="opacity-30 dark:opacity-50">
                <div className="absolute -left-12 rounded-lg -rotate-45 -top-6 w-1/2 h-2/3 bg-theme-active/30 blur-md"></div>
                <div
                  data-theme="warning"
                  className="absolute -right-12 rounded-full rotate-12 -bottom-6 w-3/4 h-2/3 bg-theme-active/25 blur-xl"
                ></div>
                <div
                  data-theme="brand"
                  className="absolute -right-12 rounded-full rotate-12 -top-12 w-3/4 h-2/3 bg-theme-active/40 blur-xl"
                ></div>
              </div>

              <DocsComponent.Example
                defaultOpen
                className="mt-0 relative shadow-2xl shadow-neutral-500/5 dark:shadow-transparent"
                initialCode={`() => 
  <div className='grid gap-size-2y'>
    <InputGroup>
      <Input placeholder="First Name" />
      <Input placeholder="Last Name" />
    </InputGroup>
    <Button theme="brand">
      Send
    </Button>    
  </div>
    `}
                scope={{
                  Input,
                  Icon,
                  Button,
                  InputGroup
                }}
                imports={{
                  "@parssa/universal-ui": {
                    named: ["Input", "InputGroup", "Button"]
                  },
                  "react-icons/hi": {
                    default: "Icon"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </ThemeProvider>
      <Primitives />
      <Footer />
    </div>
  );
}
