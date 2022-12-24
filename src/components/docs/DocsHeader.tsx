import { Text } from "@parssa/universal-ui";
import React from "react";

export const DocsHeader = ({
  title,
  description,
  ...props
}: Omit<DivProps, "title"> & {
  title: React.ReactNode;
  description?: React.ReactNode;
}) => {
  return (
    <div {...props}>
      <Text variant="h1">{title}</Text>
      {description && (
        <Text variant="h4" className="opacity-60 mt-size-y">
          {description}
        </Text>
      )}
    </div>
  );
};
