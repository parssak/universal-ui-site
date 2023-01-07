import { useState } from "react";
import { useView } from "react-view";
import { cx } from "utils";
import { ComponentPreview } from "./ComponentPreview";

export const ComponentExample = ({
  initialCode,
  imports,
  scope,
  defaultOpen = false,
  ...props
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
  defaultOpen?: boolean;
} & DivProps) => {
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
    <div {...props} className={cx("mt-size-2y", props.className)}>
      <ComponentPreview params={params} defaultOpen={defaultOpen} />
    </div>
  );
};
