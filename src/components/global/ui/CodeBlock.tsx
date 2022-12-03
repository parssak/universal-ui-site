import { useDarkMode } from "hooks/useDarkMode";
import React, { useEffect } from "react";
// import hljs from "highlight.js/lib/core";
// import jsx from "highlight.js/lib/languages/javascript";
import { cx, isSSR } from "utils";
import { Button } from "@parssa/universal-ui";
import highlight from "utils/prism";

// hljs.registerLanguage("jsx", jsx);

type DivProps = React.HTMLAttributes<HTMLPreElement>;

export const CodeBlock = ({ ...props }: DivProps & {}) => {
  const [isDarkMode] = useDarkMode();

  useEffect(() => {
    if (isSSR) return;
    highlight();
  }, []);

  // React.useEffect(() => {
  //   hljs.highlightAll();
  // }, [isDarkMode]);

  const codeRef = React.useRef<HTMLSpanElement>(null);

  const onCopy = () => {
    if (isSSR) return;

    const code = (codeRef.current as HTMLSpanElement).innerText;
    if (!code) return;

    navigator.clipboard.writeText(code);
  };

  return (
    <div
      className={cx(
        "rounded-md overflow-hidden border border-theme-active/50 relative ",
        props.className
      )}
    >
      <pre {...props} className={cx("dark:invert !px-4 !py-3 hue-rotate-180 contrast-150")}>
        <code ref={codeRef} className="language-jsx ">
          {props.children}
        </code>
      </pre>
      <Button
        size="sm"
        className="absolute top-2 right-2"
        onClick={onCopy}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
            />
          </svg>
        }
      >
        <span className="sr-only">Copy to clipboard</span>
      </Button>
    </div>
  );
};
