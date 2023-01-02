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
      <Text variant="h1" className="gradient-text leading-tight">
        {title}
      </Text>
      {description && (
        <Text variant="h4" as='p' className="text-theme-muted font-medium">
          {description}
        </Text>
      )}
    </div>
  );
};
