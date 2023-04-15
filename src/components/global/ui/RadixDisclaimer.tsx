import { Card, Text } from "@parssa/universal-ui";
import React from "react";
import { cx } from "utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

const LinkText = ({
  href,
  ...props
}: React.HTMLAttributes<HTMLAnchorElement> & { href: string }) => (
  <Text
    {...props}
    as="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cx(
      // base
      "inline-block text-blue-500 dark:text-blue-400 ",
      "duration-300 ease-spring transition-all skew-x-1",
      // base -> hover
      "hover:-hue-rotate-60 hover:-skew-x-6",
      // ::before (rect)
      "before:block before:absolute before:inset-y-0 before:-inset-x-0.5 before:scale-75",
      "before:rounded before:opacity-0 before:bg-sky-400/20",
      "before:duration-300 before:ease-spring",
      // ::before -> hover
      "hover:before:opacity-100 hover:before:scale-100",
      // ::after (underline)
      "after:absolute after:w-full after:bottom-0 after:rounded-full",
      "after:h-[1.5px] after:left-0 after:scale-x-95 after:-translate-y-0.5",
      "after:bg-blue-500 dark:after:bg-blue-400",
      "after:duration-300 after:ease-spring after:transition-all",
      // ::after -> hover
      "hover:after:scale-x-75 hover:after:translate-y-0.5 hover:after:opacity-80"
    )}
  />
);

export const RadixDisclaimer = ({
  componentName,
  radixComponentName,
  radixURL,
  ...props
}: DivProps & {
  componentName: string;
  radixComponentName: string;
  radixURL: string;
}) => {
  return (
    <Card {...props} theme="info" className="mb-size-4y bg-theme-muted/20" size="sm">
      <Card.Content>
        <Text>
          <span className="font-medium">
            {componentName} is built on top{" "}
            <LinkText href={radixURL}>RadixUI {radixComponentName}</LinkText> component.
          </span>{" "}
          All RadixUI props are passed, and can be used in the same way.
        </Text>
      </Card.Content>
    </Card>
  );
};
