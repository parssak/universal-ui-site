import { Text } from "@parssa/universal-ui";
import { useView, Compiler, Editor, Error, PropTypes } from "react-view";
import { ComponentPreview } from "./ComponentPreview";

export const ComponentExample = ({
  title,
  initialCode,
  imports,
  scope
}: {
  title: string;
  initialCode: string;
  imports?: {
    [key: string]: {
      named?: string[];
      default?: string;
    };
  };
  scope?: {
    [key: string]: any;
  };
}) => {
  const params = useView({
    componentName: "Button",
    initialCode,
    scope: {
      ...scope
    },
    imports: {
      ...imports
    }
  });

  return (
    <div className='mt-size-4y'>
      <Text variant="h3" className="mb-size-2y">
        {title}
      </Text>
      <ComponentPreview params={params} />
    </div>
  );
};
