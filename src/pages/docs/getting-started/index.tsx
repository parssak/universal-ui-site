import { Text } from "@parssa/universal-ui";
import { DocsLayout } from "components/docs/DocsLayout";
import { Sidebar } from "components/docs/Sidebar";
import { CodeBlock } from "components/global/ui/CodeBlock";

import Link from "next/link";

export default function Docs() {
  return (
    <DocsLayout>
      <Text variant="h1">Getting Started</Text>

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
        to provide global styling. Note: if you're using Next.js, you should pass in the{" "}
        <Text variant="code" size="sm" theme="warning">
          ssr: true
        </Text>{" "}
        prop to ensure that the styles are rendered on the server.
      </Text>

      <CodeBlock className="my-size-2y">
        {`import { UniversalUIProvider } from "@parssa/universal-ui";

const App = () => {
  return (
    <UniversalUIProvider 
      value={{
        ssr: true, // for SSR support (Next.js)
        components: {}
      }}
    >
      {/* ... */}
    </UniversalUIProvider>         
  )
}`}
      </CodeBlock>
      <Text>
        If you want to learn more on how to theme Universal UI,{" "}
        <Link href="/docs/customization">
          <span className="link">go here</span>.
        </Link>
      </Text>

      <Text className="mt-size-4y">
        Lastly, make sure to add the following to your{" "}
        <Text variant="code" size="sm">
          tailwind.config.js
        </Text>{" "}
        file. This ensures that tailwind with compile the styles for Universal UI, and enables the
        custom Universal UI plugin.
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

      <Text className="mt-size-4y">
        That's it! 🎉 You're now ready to use Universal UI in your app.
      </Text>
    </DocsLayout>
  );
}
