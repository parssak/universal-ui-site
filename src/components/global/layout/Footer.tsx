import { Text } from "@parssa/universal-ui";
import React from "react";
import { cx } from "utils";

type FooterProps = React.HTMLAttributes<HTMLDivElement>;

export const Footer = ({ ...props }: FooterProps & {}) => {
  return (
    <footer
      {...props}
      data-theme="brand"
      data-dark={true}
      className={cx(`bg-theme-base border-t border-theme-active/70 relative`, props.className)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-theme-base to-theme-active/70 pointer-events-none" aria-hidden='true' />
      <div className="container py-4 text-center grid place-items-center relative">
        <Text className="text-theme-active" size="xs">
          Made with ❤️ by{" "}
          <a href="https://parssak.com" target="_blank">
            Parssa Kyanzadeh
          </a>
        </Text>
      </div>
    </footer>
  );
};
