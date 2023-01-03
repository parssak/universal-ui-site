import { Card, Text } from "@parssa/universal-ui";
import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export const Todo = ({ ...props }: DivProps & {}) => {
  return (
    <Card theme="warning"  {...props} className='my-size-4y first:mt-0'>
      <Card.Content>
        <Text><span className="font-bold font-mono text-theme-muted">TODO:</span> {props.children}</Text>
      </Card.Content>
    </Card>
  );
};
