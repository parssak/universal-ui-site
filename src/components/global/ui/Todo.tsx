import { Card, Text } from "@parssa/universal-ui";
import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export const Todo = ({
  prefix,
  ...props
}: DivProps & {
  prefix: "TODO";
}) => {
  return (
    <Card theme="warning" {...props} className="my-size-4y first:mt-0">
      <Card.Content>
        <Text>
          <span className="font-bold font-mono text-theme-muted">{prefix}</span> {props.children}
        </Text>
      </Card.Content>
    </Card>
  );
};
