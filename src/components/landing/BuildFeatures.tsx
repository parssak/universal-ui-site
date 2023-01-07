import { Button, Card, Input, InputGroup, Select, Text, ThemeProvider } from "@parssa/universal-ui";
import { DocsComponent } from "components/docs/DocsComponent";
import { Footer } from "components/global/layout/Footer";
import Link from "next/link";
import { useState } from "react";
import { HiCheck, HiOutlineClipboard } from "react-icons/hi";
import { isSSR } from "utils";
import * as Icon from "react-icons/hi";

export const BuildFeatures = () => {
  return (
    <div className="bg-theme-pure py-size-4y border-y border-theme-active/30">
      <div className="container grid lg:grid-cols-2 gap-size-2x lg:py-size-4y">
        <div className="py-size-4y flex justify-center flex-col items-start">
          <div>
            <Text variant="h2" className="text-3xl">
              Build <b>features</b>, not UI components
            </Text>
            <Text variant="h3" className="opacity-80">
              Scaffold your app in minutes, not hours
            </Text>
            <Text className="max-w-lg mt-size-4y">
              Universal UI is built with accessibility, performance, and DX in mind. <br />
              <br />
              New components are added regularly, and you can always customize them to your needs.
              <br />
              <br />
              All components under the hood are built with TailwindCSS, so you can easily customize
              them to your needs, without needing to override styles with sketchy{" "}
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
          <div className="relative isolate  overflow-hidden">
            <div className="opacity-30 dark:opacity-50">
              <div className="absolute -left-12 rounded-lg -rotate-12 top-12 w-1/2 h-2/3 bg-theme-active/30 blur-sm"></div>
              <div
                data-theme="warning"
                className="absolute -right-12 rounded-full rotate-12 -bottom-6 w-3/4 h-2/3 bg-theme-active/25 blur-xl"
              ></div>
              <div
                data-theme="brand"
                className="absolute -right-12 rounded-full rotate-12 top-8 w-3/4 h-2/3 bg-theme-active/40 blur-xl"
              ></div>
            </div>

            <DocsComponent.Example
              defaultOpen
              className="mt-0  shadow-2xl shadow-neutral-500/5 dark:shadow-transparent"
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
    </div>
  );
};
