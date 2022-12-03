import { Button, Card, Input, Text, ThemeProvider } from "@parssa/universal-ui";
import { Footer } from "components/global/layout/Footer";
import { CodeBlock } from "components/global/ui/CodeBlock";
import Link from "next/link";

export default function Home() {
  return (
    <ThemeProvider className="bg-theme-pure relative overflow-hidden grid-pattern min-h-screen flex flex-col">
      <ThemeProvider
        theme="brand"
        className="absolute mix-blend-multiply dark:mix-blend-normal  -top-24 -inset-x-12 h-[26rem] bg-gradient-to-tr  blur-3xl via-theme-base/20 from-transparent to-theme-active dark:to-theme-base/60 dark:opacity-60"
      />

      <ThemeProvider
        theme="info"
        className="mix-blend-multiply dark:mix-blend-normal absolute -bottom-24 -inset-x-12 h-[26rem] bg-gradient-to-bl  blur-3xl via-theme-base/20 from-transparent to-theme-active dark:to-theme-base/60 dark:opacity-60"
      />
      <div className="container  flex-1 grid place-items-center pb-24">
        <div className="flex flex-col items-center text-center">
          <Card theme="warning" className="rounded mb-6 w-max" size="xs">
            <Card.Content>
              <Text className="font-medium">
                🚧 This library (& docs) are under active development
              </Text>
            </Card.Content>
          </Card>
          <Text className="text-5xl" variant="h1">
            Universal UI
          </Text>
          <Text className="mb-size-4y mt-size-y" variant="h4">
            A customizable, TailwindCSS-first, React UI Library.
          </Text>

          <Text>
            Build beautiful & customizable interfaces with TailwindCSS-first React components.
          </Text>
          <div className="flex flex-col md:flex-row md:items-center gap-size-x mt-size-4y ">
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
            {/* <pre className="border truncate border-theme-base pl-size-x pr-size-2x relative py-size-y text-theme-base font-mono rounded">
            npm install @parssa/universal-ui
          </pre> */}
            <Button
              className="justify-center font-mono"
              variant="outline"
              trailingIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                  />
                </svg>
              }
            >
              npm install @parssa/universal-ui
            </Button>
          </div>
          {/* <Card size="md" className="mt-24 bg-theme-pure/5 backdrop-blur-md">
          <Card.Content>
            <Text variant="h4">Inputs</Text>
            <div className="gap-size-x flex flex-wrap  items-center mt-size-4y">
              <Button theme="brand">Add to Cart</Button>
              <Button
                leadingIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              >
                Push Notification
              </Button>
              <Button
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />

              <Input placeholder="jane@mail.com" />

              <Button.Group borderOption="right" variant="outline">
                <Input theme="brand" placeholder="adam@mail.com" />
                <Button>Sign Up</Button>
              </Button.Group>
            </div>
          </Card.Content>
        </Card> */}
        </div>
      </div>
      <Footer />
    </ThemeProvider>
  );
}
