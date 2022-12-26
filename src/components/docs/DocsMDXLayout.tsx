import React from "react";
import { DocsLayout } from "./DocsLayout";

export const DocsMDXLayout = ({
  meta,
  children,
  ...props
}: DivProps & {
  meta: {
    title: string;
    description?: string;
  }
}) => {
  return (
    <DocsLayout {...props}>
      <DocsLayout.Header title={meta.title} description={meta.description} />
      {children}
    </DocsLayout>
  );
};
