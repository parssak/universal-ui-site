import { Text } from "@parssa/universal-ui";
import { Sidebar } from "components/docs/Sidebar";
import { CodeBlock } from "components/global/ui/CodeBlock";

export default function Docs() {
  return (
    <div className="flex w-full h-full flex-1">
      <Sidebar className="hidden md:block" />
      <div className="w-full flex-1 ">
        <div className="container py-12">
          <Text variant="h1">Getting Started</Text>
          <Text className="mt-size-4y">
            Begin by installing{" "}
            <Text size="sm" variant="code">
              @parssa/universal-ui
            </Text>{" "}
            with your package manager of choice.
          </Text>

          <CodeBlock className="my-size-4y">npm install @parssa/universal-ui</CodeBlock>
          <Text>
            Then, wrap the root of your app in the{" "}
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
        </div>
      </div>
    </div>
  );
}
