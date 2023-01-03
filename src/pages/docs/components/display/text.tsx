import { Card, Text } from "@parssa/universal-ui";
import { DocsLayout } from "components/docs/DocsLayout";
import { Todo } from "components/global/ui/Todo";

export default function TextPage() {
  return (
    <DocsLayout>
      <DocsLayout.Header title="Text" description={<>Useful for rendering any form of text.</>} />
      <Todo>This page is still under construction. Please check back later.</Todo>

      <Card className="mt-size-4y bg-theme-pure/25 backdrop-blur-lg grid-pattern">
        <Card.Content className="py-size-2y md:py-size-4y my-size-4y px-size-2x md:px-size-4x">
          <Text variant="h1">This is a dummy article</Text>
          <Text variant="h2" className="mt-6">
            What is this about?
          </Text>
          <Text className="mt-4">
            This article is essentially about nothing. It is a dummy article that is used to test
            the Text component.
          </Text>

          <Text className="leading-loose">
            To activate the{" "}
            <Text variant="code" size={"sm"}>
              Command Pallette
            </Text>
            , press{" "}
            <span className="space-x-[3px]">
              <Text variant="kbd" size={"sm"}>
                Ctrl
              </Text>
              <Text variant="kbd" size={"sm"}>
                Shift
              </Text>
              <Text variant="kbd" size={"sm"}>
                P
              </Text>
            </span>
          </Text>

          <Text variant="h3" className="mt-4">
            How to use it
          </Text>

          <Text className="mt-2">
            To use this component, you can simply import it from the{" "}
            <Text variant="code" size={"sm"}>
              @universal-ui/react
            </Text>{" "}
            package.
          </Text>

          <Text className="mt-1">
            You can also use the{" "}
            <Text variant="code" size={"sm"}>
              Text
            </Text>{" "}
            component to render{" "}
            <Text variant="code" size={"sm"}>
              code
            </Text>{" "}
            and{" "}
            <Text variant="code" size={"sm"}>
              keyboard shortcuts
            </Text>
            .
          </Text>

          <Text variant="h4" className="mt-4">
            Smaller heading
          </Text>
          <Text variant="h5" className="mt-4">
            Even Smaller heading
          </Text>
          <Text variant="h6" className="mt-4">
            Smallest heading
          </Text>
        </Card.Content>
      </Card>
    </DocsLayout>
  );
}
