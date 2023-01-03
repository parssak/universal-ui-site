import { useState } from "react";
import { useView } from "react-view";
import { ComponentPreview } from "./ComponentPreview";

export const ComponentExample = ({
  initialCode,
  imports,
  scope
}: {
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
  const [key, setKey] = useState("component-example-0");
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

  const onRefresh = () => {
    setKey((prev) => prev.replace(/\d+$/, (match) => `${Number(match) + 1}`));
  };

  return (
    <div className="mt-size-2y">
      <ComponentPreview params={params} key={key} onRefresh={onRefresh} />
    </div>
  );
};
