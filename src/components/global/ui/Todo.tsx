import { Card, Text } from "@parssa/universal-ui";
import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export const Todo = ({ ...props }: DivProps & {}) => {
  return (
    <Card theme="warning"  {...props}>
      <Card.Content>
        <Text><span className="font-bold">TODO:</span> {props.children}</Text>
      </Card.Content>
    </Card>
  );
};
