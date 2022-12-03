import { Text } from "@parssa/universal-ui";
import { DocsLayout } from "components/docs/DocsLayout";
import { Sidebar } from "components/docs/Sidebar";
import { CodeBlock } from "components/global/ui/CodeBlock";

import Link from "next/link";

export default function Docs() {
  return (
    <DocsLayout>
      <Text variant="h1">Customization</Text>

      <Text className="mt-size-4y">
        Universal UI provides two main ways to globally customize the look and feel of your
        application; through the{" "}
        <Text variant="code" size="sm">
          UniversalUIProvider
        </Text>{" "}
        and the{" "}
        <Text variant="code" size="sm">
          tailwind.config.js
        </Text>{" "}
        plugin.
      </Text>

      <Text className="mt-size-4y w-max" variant="code" size="xl" as="h2">
        UniversalUIProvider
      </Text>

      <Text className="mt-size-2y">
        The{" "}
        <Text variant="code" size="sm">
          UniversalUIProvider
        </Text>{" "}
        is a React Context Provider that allows you to customize the look and feel of Universal UI
        by overriding the behavior of all components.
      </Text>

      <CodeBlock className="my-size-2y">
        {`import { UniversalUIProvider } from "@parssa/universal-ui";

const App = () => {
  return (
    <UniversalUIProvider 
      value={{
        components: {
          button: 'shadow-none'
        }
      }}
    >
      {/* ... */}
    </UniversalUIProvider>         
  )
}`}
      </CodeBlock>
      <Text className="mt-size-y">
        Above is an example of how to override the default shadow on all buttons. The keys of the{" "}
        <Text variant="code" size="sm">
          components
        </Text>{" "}
        are either strings, or functions that provide the props of the component, and should return
        a string. This is useful when needing to override the behavior of a component based on the
        props passed to it.
      </Text>

      <CodeBlock className="my-size-2y">
        {`import { UniversalUIProvider } from "@parssa/universal-ui";

const App = () => {
  return (
    <UniversalUIProvider
      value={{
        components: {
          text: ({ variant }) => {
            if (variant === 'h1') {
              return 'font-extrabold'
            }

            if (variant === 'h6') {
              return 'tracking-wider uppercase'
            }
          }
        }
      }}
    >
      {/* ... */}
    </UniversalUIProvider>
  )
}`}
      </CodeBlock>

      <Text className="mt-size-4y w-max" variant="code" size="xl" as="h2">
        tailwind.config.js
      </Text>

      <Text className="mt-size-2y">
        Universal UI provides a robust{" "}
        <Text variant="code" size="sm">
          tailwind.config.js
        </Text>{" "}
        plugin that allows you to customize the look and feel of Universal UI by overriding the
        default colors and spacing.
      </Text>

      
    </DocsLayout>
  );
}
