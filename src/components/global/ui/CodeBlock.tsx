import React, { useEffect, useState } from "react";
import { cx, isSSR } from "utils";
import { Button, Card, Tooltip } from "@parssa/universal-ui";
import highlight from "utils/prism";
import { HiCheck, HiOutlineClipboard } from "react-icons/hi";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export const CodeBlock = ({ children, ...props }: DivProps & {}) => {
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (isSSR) return;
    highlight();
  }, [children]);

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
    <Card
      {...props}
      theme={copied ? "success" : "neutral"}
      className={cx("relative overflow-hidden transition-all bg-theme-pure w-full", props.className)}
    >
      <pre className={cx("p-size-x text-sm text-theme-base ")}>
        <code ref={codeRef} className="language-jsx">
          {children}
        </code>
      </pre>
      <Tooltip.Root>
        <Tooltip.Trigger
          onClick={(e) => e.preventDefault()}
          data-size="sm"
          className="absolute top-size-x right-size-x "
        >
          <Button
            size="sm"
            theme={copied ? "success" : "neutral"}
            onClick={onCopy}
            data-name="copy-btn"
            variant="ghost"
            icon={
              copied ? (
                <HiCheck className="w-full h-full" />
              ) : (
                <HiOutlineClipboard className="w-full h-full" />
              )
            }
          >
            Copy to clipboard
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content
          theme={copied ? "success" : "neutral"}
          size="xs"
          onPointerDownOutside={(e) => {
            if (e.target instanceof HTMLElement && e.target.dataset?.name === "copy-btn") {
              e.preventDefault();
            }
          }}
        >
          {copied ? "Copied!" : "Copy to clipboard"}
        </Tooltip.Content>
      </Tooltip.Root>
    </Card>
  );
};
