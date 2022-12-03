import { Text } from "@parssa/universal-ui";
import React from "react";
import { cx } from "utils";

type FooterProps = React.HTMLAttributes<HTMLDivElement>;

export const Footer = ({ ...props }: FooterProps & {}) => {
  return (
    <footer {...props} className={cx(`bg-theme-inverted`, props.className)}>
      <div className="container py-4 text-center grid place-items-center">
        <Text className="text-theme-inverted" size="xs">
          Made with ❤️ by <a href='https://parssak.com' target="_blank">Parssa Kyanzadeh</a>
        </Text>
      </div>
    </footer>
  );
};
