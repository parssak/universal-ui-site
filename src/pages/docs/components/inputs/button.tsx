import { Button, Card, Text } from "@parssa/universal-ui";
import { DocsLayout } from "components/docs/DocsLayout";

export default function ButtonPage() {
  return (
    <DocsLayout>
      <Text variant="h1">Button</Text>

      <Card className="mt-size-4y bg-theme-pure/25 backdrop-blur-lg grid-pattern">
        <Card.Content className="py-size-4y my-size-4y grid place-items-center">
          <div className="flex gap-2 items-center flex-col">
            <Button size="xs">Hello</Button>
            <Button size="sm">Hello</Button>
            <Button>Hello</Button>
            <Button size="lg">Hello</Button>
            <Button size="xl">Hello</Button>
          </div>
        </Card.Content>
      </Card>
    </DocsLayout>
  );
}
