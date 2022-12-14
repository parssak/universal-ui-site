import { Button, Card, Text } from "@parssa/universal-ui";
import { DocsLayout } from "components/docs/DocsLayout";
import { Todo } from "components/global/ui/Todo";

export default function CardPage() {
  return (
    <DocsLayout>
      <DocsLayout.Header
        title="Card"
        description="A card is a flexible and extensible content container."
      />
      <Todo>This page is still under construction. Please check back later.</Todo>

      <Card className="mt-size-4y bg-theme-pure/25 backdrop-blur-lg grid-pattern">
        <Card.Content className="py-size-2y md:py-size-4y my-size-4y px-size-2x md:px-size-4x">
          <Card className="bg-theme-pure max-w-xl mx-auto">
            <Card.Content>
              <Text variant="h2">Subscribe Today</Text>
            </Card.Content>
            <Card.Content>
              <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</Text>
            </Card.Content>
            <Card.Content className="flex justify-end">
              <Button theme="brand">Subscribe</Button>
            </Card.Content>
          </Card>
        </Card.Content>
      </Card>
    </DocsLayout>
  );
}
