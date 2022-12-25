import React from "react";
import { DocsLayout } from "./DocsLayout";

export const DocsMDXLayout = ({
  title,
  description,
  children,
  ...props
}: Omit<DivProps, "title"> & {
  title: string;
  description?: string;
}) => {
  return (
    <DocsLayout {...props}>
      <DocsLayout.Header title={title} description={description} />
      {children}
    </DocsLayout>
  );
};
