import { Card } from "@parssa/universal-ui";
import { Theme } from "@parssa/universal-ui/dist/types";
import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export const Callout = ({
  children,
  theme = "info",
  ...props
}: DivProps & {
  theme?: Theme;
}) => {
  return (
    <Card {...props} theme={theme} data-name='callout'>
      <Card.Content>{children}</Card.Content>
    </Card>
  );
};
