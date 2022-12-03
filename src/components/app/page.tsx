"use client";
import { Button, Card, Input, Text } from "@parssa/universal-ui";
import Link from "next/link";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="container pt-24 md:pt-48">
      <Text variant="h1">Universal UI</Text>
      <Text className="mb-size-4y" variant="h4">
        A customizable, TailwindCSS-first, React UI Library.
      </Text>

      <Text>
        Build beautiful & customizable interfaces with TailwindCSS-first React components.
      </Text>
      <Button
        theme="brand"
        as={Link}
        href="/docs"
        className="mt-size-4y group"
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
      <Card size="md" className="mt-24">
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
      </Card>
      {children}
    </div>
  );
}
