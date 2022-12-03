import { Text } from "@parssa/universal-ui";
import React from "react";
import { cx } from "utils";

type FooterProps = React.HTMLAttributes<HTMLDivElement>;

export const Footer = ({ ...props }: FooterProps & {}) => {
  return (
    <footer {...props} data-theme='brand-dark' className={cx(`bg-theme-base border-t border-theme-base relative z-10`, props.className)}>
      <div className="container py-4 text-center grid place-items-center">
        <Text className="text-theme-active" size="xs">
          Made with ❤️ by <a href='https://parssak.com' target="_blank">Parssa Kyanzadeh</a>
        </Text>
      </div>
    </footer>
  );
};
