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
      <Text variant="h1" className="gradient-text">
        {title}
      </Text>
      {description && (
        <Text variant="h4" className="text-theme-muted mt-size-y font-medium">
          {description}
        </Text>
      )}
    </div>
  );
};
