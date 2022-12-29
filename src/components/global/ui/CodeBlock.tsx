import React, { useEffect, useState } from "react";
import { cx, isSSR } from "utils";
import { Button, ThemeProvider } from "@parssa/universal-ui";
import highlight from "utils/prism";
import { HiCheck, HiOutlineClipboard } from "react-icons/hi";

type DivProps = React.HTMLAttributes<HTMLPreElement>;

export const CodeBlock = ({ ...props }: DivProps & {}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isSSR) return;
    highlight();
  }, []);

  const codeRef = React.useRef<HTMLSpanElement>(null);

  const onCopy = () => {
    if (isSSR) return;

    const code = (codeRef.current as HTMLSpanElement).innerText;
    if (!code) return;

    navigator.clipboard.writeText(code);

    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div
      // theme="brand"
      className={cx(
        "rounded-md relative overflow-hidden border border-theme-active/60  bg-theme-pure",
        props.className
      )}
    >
      <pre
        {...props}
        className={cx("px-4 py-3 text-sm text-theme-base overflow-auto scrollbar-hide")}
      >
        <code ref={codeRef} className="language-jsx">
          {props.children}
        </code>
      </pre>
      <Button
        size="sm"
        theme="neutral"
        className="absolute top-[7px] right-size-x active:absolute enabled:absolute active:top-2 active:right-2"
        onClick={onCopy}
        icon={
          copied ? (
            <HiCheck className="w-full h-full" />
          ) : (
            <HiOutlineClipboard className="w-full h-full" />
          )
        }
      >
        <span className="sr-only">Copy to clipboard</span>
      </Button>
    </div>
  );
};
