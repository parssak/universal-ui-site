import { useDarkMode } from "hooks/useDarkMode";
import React from "react";
import hljs from "highlight.js";
import { cx, isSSR } from "utils";
import { Button } from "@parssa/universal-ui";

type DivProps = React.HTMLAttributes<HTMLPreElement>;

export const CodeBlock = ({ ...props }: DivProps & {}) => {
  const [isDarkMode] = useDarkMode();

  React.useEffect(() => {
    hljs.highlightAll();
  }, [isDarkMode]);

  const codeRef = React.useRef<HTMLPreElement>(null);

  const onCopy = () => {
    if (isSSR) return;

    const code = codeRef.current?.innerText;
    if (!code) return;

    navigator.clipboard.writeText(code);
  };

  return (
    <pre
      ref={codeRef}
      {...props}
      className={cx(
        "rounded-lg overflow-hidden border border-theme-active/50 relative",
        props.className
      )}
    >
      <code className="ts dark:invert">{props.children}</code>
      <Button
        variant="outline"
        size="sm"
        className="absolute top-2 right-2"
        onClick={onCopy}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M13.887 3.182c.396.037.79.08 1.183.128C16.194 3.45 17 4.414 17 5.517V16.75A2.25 2.25 0 0114.75 19h-9.5A2.25 2.25 0 013 16.75V5.517c0-1.103.806-2.068 1.93-2.207.393-.048.787-.09 1.183-.128A3.001 3.001 0 019 1h2c1.373 0 2.531.923 2.887 2.182zM7.5 4A1.5 1.5 0 019 2.5h2A1.5 1.5 0 0112.5 4v.5h-5V4z"
              clipRule="evenodd"
            />
          </svg>
        }
      />
    </pre>
  );
};
