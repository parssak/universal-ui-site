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
    <ThemeProvider
      theme="neutral"
      dark
      className={cx(
        "rounded-md overflow-hidden border border-theme-active/40 relative bg-[#040019]",
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
        className="absolute top-2 right-2 shadow-none cursor-copy"
        onClick={onCopy}
        icon={copied ? <HiCheck className="w-full h-full" /> : <HiOutlineClipboard className="w-full h-full" />}
      >
        <span className="sr-only">Copy to clipboard</span>
      </Button>
    </ThemeProvider>
  );
};
