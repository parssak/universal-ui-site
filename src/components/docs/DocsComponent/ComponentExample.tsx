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
    <div className="mt-size-2y">
      <ComponentPreview params={params} />
    </div>
  );
};
