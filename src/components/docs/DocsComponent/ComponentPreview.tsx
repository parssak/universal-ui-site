import React, { useState } from "react";
import { cx, isSSR } from "utils";
import { useView, Compiler, Editor } from "react-view";
import { Button, Card, Text, ThemeProvider } from "@parssa/universal-ui";
import {
  HiCheck,
  HiOutlineClipboard,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiRefresh
} from "react-icons/hi";

export const ComponentPreview = ({ params }: { params: ReturnType<typeof useView> }) => {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [reset, setReset] = useState(false);

  const onCopy = () => {
    if (isSSR) return;
    setCopied(true);
    params.actions.copyCode();
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onShowCodeToggle = () => {
    setShowCode((prev) => !prev);
  };

  const onReset = () => {
    if (reset) {
      return;
    }
    setReset(true);
    params.actions.reset();
    setTimeout(() => {
      setReset(false);
    }, 600);
  };

  return (
    <Card className="bg-theme-pure/25 backdrop-blur-lg grid-pattern with-spotlight overflow-hidden">
      <div className="relative">
        <Card.Content className={`py-size-4y grid place-items-center `}>
          <div className="flex gap-2 items-center flex-col py-size-4y">
            <Compiler {...params.compilerProps} minHeight={62} className="flex gap-2 flex-row" />
          </div>
        </Card.Content>

        <div className="bottom-size-2y right-size-x absolute z-10 flex gap-size-hx" data-size="sm">
          <Button
            variant="ghost"
            className="group"
            onClick={onReset}
            icon={<HiRefresh className={cx(`w-full h-full`, reset && "animate-spin-reverse")} />}
          >
            Reset Example
          </Button>
          <Button
            variant="ghost"
            onClick={onCopy}
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
          <Button
            variant="ghost"
            onClick={onShowCodeToggle}
            icon={
              showCode ? (
                <HiOutlineEyeOff className="w-full h-full" />
              ) : (
                <HiOutlineEye className="w-full h-full" />
              )
            }
          >
            {showCode ? "Hide code" : "Show code"}
          </Button>
        </div>
      </div>
      {showCode && (
        <div
          onBlurCapture={(e) => {
            if (e.relatedTarget === null) {
              params.actions.formatCode();
            }
          }}
          data-size="sm"
        >
          <Editor
            theme={{
              plain: {
                backgroundColor: "rgb(var(--color-bg-pure))",
                color: "var(--theme-text-primary)",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "var(--size-text)",
                margin: 0
              },
              styles: []
            }}
            {...params.editorProps}
            code={params.editorProps.code.replace(`import * as React from "react";\n\n`, "")}
            className={`border-t border-theme-base/40`}
          />
          {params.errorProps.msg && (
            <ThemeProvider theme="error" size="sm" className="bg-theme-base p-size-x">
              <Text className="font-mono">{params.errorProps.msg}</Text>
            </ThemeProvider>
          )}
        </div>
      )}
    </Card>
  );
};
