import { Text } from "@parssa/universal-ui";
import { DocsLayout } from "components/docs/DocsLayout";
import { CodeBlock } from "components/global/ui/CodeBlock";

export default function Customization() {
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
        allows you to customize the look and feel of Universal UI by overriding the behavior of all
        components.
      </Text>

      <CodeBlock className="my-size-2y">
        {`import { UniversalUIProvider } from "@parssa/universal-ui";

const config = {
  components: {
    button: 'shadow-none'
  }
}

const App = () => {
  return (
    <UniversalUIProvider config={config}>
      {/* ... */}
    </UniversalUIProvider>         
  )
}`}
      </CodeBlock>
      <Text className="mt-size-y">
        Example of how to override the default shadow on all buttons. The keys of the{" "}
        <Text variant="code" size="sm">
          components
        </Text>{" "}
        are either strings, or functions that provide the props of the component, and should return
        a string. This is useful when needing to override the behavior of a component based on the
        props passed to it.
      </Text>

      <CodeBlock className="mt-size-4y">
        {`const config = {
  components: {
    text: ({ variant }) =>
      ({
        h1: "text-5xl",
        h6: "tracking-widest text-xs font-mono"
      }[variant] ?? "")
  }
};`}
      </CodeBlock>
      <Text className="mt-size-y">
        Example of how to override the default shadow on all buttons. The keys of the{" "}
        <Text variant="code" size="sm">
          components
        </Text>{" "}
        are either strings, or functions that provide the props of the component, and should return
        a string. This is useful when needing to override the behavior of a component based on the
        props passed to it.
      </Text>

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

      <CodeBlock className="my-size-2y">
        {`module.exports = {
  theme: {
    universalUI: {
      themes: [
        {
          // Used https://uicolors.app/create to generate this pallette
          name: "brand",
          colors: {
            50: "#f1f8f4",
            100: "#ddeee3",
            200: "#bdddc9",
            300: "#9ac8af",
            400: "#63a482",
            500: "#428766",
            600: "#306b50",
            700: "#265641",
            800: "#204536",
            900: "#1b392d"
          }
        },
      ]
    }
  }
}`}
      </CodeBlock>

      <Text className="mt-size-y" size="sm">
        Example of how to override the{" "}
        <Text variant="code" size="xs">
          brand
        </Text>{" "}
        theme with a green pallette. The pallette is generated using{" "}
        <a target={"_blank"} href="https://uicolors.app/create" className="link">
          uicolors.app
        </a>
        , which from our experience, yields the bests results.
      </Text>
    </DocsLayout>
  );
}
