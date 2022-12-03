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
