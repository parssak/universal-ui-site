import { Button, Text } from "@parssa/universal-ui";
import { DocsLayout } from "components/docs/DocsLayout";
import { PropTypes } from "react-view";
import * as Icon from "react-icons/hi";
import { DocsComponent } from "components/docs/DocsComponent";

export default function ButtonPage() {
  return (
    <DocsLayout className="relative">
      <DocsLayout.Header
        title="Button"
        description="Used to trigger actions and events. Y'know, like a button."
      />
      <div className="mt-size-4y space-y-size-4y">
        <DocsComponent.Primary
          componentName="Button"
          defaultProps={[
            "children",
            "theme",
            "size",
            "variant",
            "disabled",
            {
              name: "leadingIcon",
              type: PropTypes.ReactNode,
              description: "Icon shown before the content.",
              value: "",
              placeholder:
                '<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">'
            },
            {
              name: "trailingIcon",
              type: PropTypes.ReactNode,
              description: "Icon shown after the content.",
              value: "",
              placeholder:
                '<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">'
            },
            {
              name: "icon",
              type: PropTypes.ReactNode,
              description:
                "Renders a uniformly shaped button with a centered icon. Children is used as alt-text",
              value: "",
              placeholder:
                '<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">'
            }
          ]}
          scope={{
            Button
          }}
          imports={{
            "@parssa/universal-ui": {
              named: ["Button"]
            }
          }}
        />

        <Text variant="h2">Examples</Text>
        <DocsComponent.Example
          title="With Icons"
          initialCode={`() => 
      <>
        <Button
          leadingIcon={<Icon.HiBell className="w-full h-full" />}>
          Notifications
        </Button>
        <Button
          trailingIcon={<Icon.HiArrowRight className="w-full h-full" />}>
          Next
        </Button>
      </>
    `}
          scope={{
            Button,
            Icon
          }}
          imports={{
            "@parssa/universal-ui": {
              named: ["Button"]
            },
            "react-icons/hi": {
              default: "Icon"
            }
          }}
        />
      </div>
    </DocsLayout>
  );
}
