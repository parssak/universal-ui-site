import { Button, Card, Input, InputGroup, Text, ThemeProvider } from "@parssa/universal-ui";
import { DocsComponent } from "components/docs/DocsComponent";
import { Footer } from "components/global/layout/Footer";
import Link from "next/link";
import { useState } from "react";
import { HiCheck, HiOutlineClipboard } from "react-icons/hi";
import { isSSR } from "utils";
import * as Icon from "react-icons/hi";

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
          className="absolute mix-blend-multiply dark:mix-blend-normal -top-24 -inset-x-12 h-[26rem] bg-gradient-to-tr  blur-3xl via-theme-base/20 from-transparent to-theme-active dark:to-theme-base/60 dark:opacity-60 pointer-events-none"
        />

        <ThemeProvider
          theme="info"
          className="mix-blend-multiply dark:mix-blend-normal absolute -bottom-24 -inset-x-12 h-[26rem] bg-gradient-to-bl  blur-3xl via-theme-base/20 from-transparent to-theme-active dark:to-theme-base/60 dark:opacity-60 pointer-events-none"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="group-hover:translate-x-1 transition-all"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
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
        className="bg-theme-pure py-size-4y border-y border-theme-active/20"
        theme="info"
        data-override="true"
      >
        <div className="container grid lg:grid-cols-2 gap-size-2x lg:py-size-4y">
          <div className="py-size-4y">
            <Text variant="h2" className='text-3xl'>
              Build <b>features</b>, not frameworks
            </Text>
            <Text variant="h3" className="opacity-80">
              Don't re-invent UI libraries for every project
            </Text>
            <Text className="max-w-lg mt-size-4y">
              Universal UI is built with accessibility, performance, and DX in mind.
            </Text>
          </div>
          <div className="">
            <div className="relative overflow-hidden">
              <div className="opacity-25">
                <div className="absolute -left-12 rounded-lg -rotate-45 -top-6 w-1/2 h-2/3 bg-theme-active/30 blur-md"></div>
                <div
                  data-theme="warning"
                  className="absolute -right-12 rounded-full rotate-12 -bottom-6 w-3/4 h-2/3 bg-theme-active/20 blur-xl"
                ></div>
                <div
                  data-theme="brand"
                  className="absolute -right-12 rounded-full rotate-12 -top-12 w-3/4 h-2/3 bg-theme-active/40 blur-xl"
                ></div>
              </div>

              <DocsComponent.Example
                className="mt-0 relative"
                initialCode={`() => 
  <div className="grid gap-size-x">
    <InputGroup borderOption="left">
      <Input placeholder="First Name" />
      <Input placeholder="Last Name" />
    </InputGroup>
    <Input placeholder="sven@mail.com" type="email" className='w-full' />
    <Button 
      theme="brand"
      leadingIcon={<Icon.HiOutlineMail className='w-full h-full' />}
    >
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

      <ThemeProvider className="bg-theme-pure py-size-4y">
        <Text variant="h2" className="text-center mb-size-4y">
          Features
        </Text>
        <div className="container grid lg:grid-cols-3 gap-size-2x">
          <Card className="p-size-4y">
            <Card.Content>
              <Text variant="h3">TailwindCSS-first</Text>
              <Text className="mt-size-y">
                Universal UI is built with TailwindCSS in mind. You can customize every aspect of
                the library with TailwindCSS.
              </Text>
            </Card.Content>
          </Card>
          <Card className="p-size-4y">
            <Card.Content>
              <Text variant="h3">Accessible</Text>
              <Text className="mt-size-y">
                Universal UI is built with accessibility in mind. Every component is accessible by
                default.
              </Text>
            </Card.Content>
          </Card>
          <Card className="p-size-4y">
            <Card.Content>
              <Text variant="h3">Performant</Text>
              <Text className="mt-size-y">
                Universal UI is built with performance in mind. Every component is performant by
                default.
              </Text>
            </Card.Content>
          </Card>
        </div>
      </ThemeProvider>
      <Footer />
    </div>
  );
}
