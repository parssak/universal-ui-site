import { Card, Text } from "@parssa/universal-ui";

import { DocsLayout } from "components/docs/DocsLayout";
import { CodeBlock } from "components/global/ui/CodeBlock";

import Link from "next/link";

export default function GettingStarted() {
  return (
    <DocsLayout>
      <DocsLayout.Header title="Getting Started" description="Get started with Universal UI in minutes." />

      <Text className="mt-size-4y">
        Begin by installing{" "}
        <Text size="sm" variant="code">
          @parssa/universal-ui
        </Text>{" "}
        with your package manager of choice.
      </Text>

      <CodeBlock className="mt-size-2y">npm install @parssa/universal-ui</CodeBlock>
      <Text className="mt-size-4y">
        Now, wrap the root of your app in the{" "}
        <Text variant="code" size="sm">
          UniversalUIProvider
        </Text>{" "}
        to provide global theming. More on how to{" "}
        <Link className="link" href="/docs/getting-started/customization">
          customize Universal UI here
        </Link>
        .
      </Text>

      <CodeBlock className="my-size-2y">
        {`import { UniversalUIProvider } from "@parssa/universal-ui";

const App = () => {
  return (
    <UniversalUIProvider 
      config={{
        ssr: true, // for SSR support (Next.js)
        components: {}
      }}
    >
      {/* ... */}
    </UniversalUIProvider>         
  )
}`}
      </CodeBlock>

      <Text className="mt-size-4y">
        Lastly, make sure to add the following to your{" "}
        <Text variant="code" size="sm">
          tailwind.config.js
        </Text>{" "}
        file.
        {/* This ensures that Tailwind will compile the styles for Universal UI, and enables the custom Universal UI plugin. */}
      </Text>

      <CodeBlock className="my-size-2y">
        {`module.exports = {
  content: [
    "./node_modules/@parssa/universal-ui/src/components/**/*.{ts,tsx,js,jsx}"
  ],
  ...
  plugins: [
    require("@parssa/universal-ui/src/plugin"),
  ]
}`}
      </CodeBlock>

      <Text className="mt-size-4y font-medium">
        That's it! 🎉 You're now ready to use Universal UI in your app.
      </Text>
    </DocsLayout>
  );
}
