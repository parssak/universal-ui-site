import { Input, Card, Text } from "@parssa/universal-ui";
import { DocsLayout } from "components/docs/DocsLayout";

export default function InputPage() {
  return (
    <DocsLayout>
      <Text variant="h1">Input</Text>

      <Card className="mt-size-4y bg-theme-pure/25 backdrop-blur-lg grid-pattern">
        <Card.Content className="py-size-4y my-size-4y grid place-items-center">
          <div className="flex gap-2 items-center flex-col">
            <Input placeholder="parssa@mail.com" variant="solid" />
            <Input placeholder="parssa@mail.com" variant="outline" />
            <Input placeholder="parssa@mail.com" variant="ghost" />
            <Input placeholder="parssa@mail.com" variant="inverted" />
          </div>
        </Card.Content>
      </Card>
    </DocsLayout>
  );
}
