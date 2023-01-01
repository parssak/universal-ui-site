import React, { useEffect, useState } from "react";
import { cx, isSSR } from "utils";
import { useView, Compiler, Editor } from "react-view";
import { Button, Card, Text, ThemeProvider, Tooltip } from "@parssa/universal-ui";
import {
  HiCheck,
  HiOutlineClipboard,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiRefresh
} from "react-icons/hi";

const useBodyElement = () => {
  const [body, setBody] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setBody(document.body);
  }, []);

  return body;
};

export const ComponentPreview = ({ params }: { params: ReturnType<typeof useView> }) => {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [render, setRender] = useState(0);
  const body = useBodyElement();

  useEffect(() => {
    setRender((prev) => prev + 1);
  }, []);

  useEffect(() => {
    // add a scroll listener to the body element
    const handleScroll = (e) => {
      // do something
      console.log("scroll", e);
    };
    if (body) {
      body.addEventListener("scroll", handleScroll);
    }

    // remove the scroll listener when the component unmounts
    return () => {
      if (body) {
        body.removeEventListener("scroll", handleScroll);
      }
    };
  }, [body]);

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

  const onRefresh = () => {
    if (refresh) {
      return;
    }
    setRefresh(true);
    params.actions.reset();
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  console.debug("render", render, body);

  return (
    <Card
      className={cx(
        "bg-theme-pure/25 transition-all backdrop-blur-lg grid-pattern",
        "with-spotlight overflow-hidden relative isolate border-theme-muted",
        refresh && "refresh-shine"
      )}
      theme={refresh || copied ? "info" : "neutral"}
    >
      <div className="relative" data-theme="neutral">
        <Card.Content
          className={`py-size-4y grid place-items-center transition-transform ${
            refresh && "refresh-shine-inner"
          }`}
        >
          <div className="flex gap-2 items-center flex-col py-size-4y">
            <Compiler {...params.compilerProps} minHeight={62} className="flex gap-2 flex-row" />
          </div>
        </Card.Content>

        <div className="bottom-size-2y right-size-x absolute z-10 flex gap-size-hx" data-size="sm">
          <Tooltip.Root>
            <Tooltip.Trigger onClick={(e) => e.preventDefault()}>
              <Button
                variant="ghost"
                className="group"
                data-name="refresh-btn"
                theme={refresh ? "info" : "neutral"}
                onClick={onRefresh}
                icon={
                  <HiRefresh
                    className={cx(
                      `w-full h-full pointer-events-none`,
                      refresh && "animate-spin-reverse"
                    )}
                  />
                }
              >
                Refresh Example
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content
              // onPointerDownOutside={(e) => {
              //   if (e.target instanceof HTMLElement && e.target.dataset?.name === "refresh-btn") {
              //     e.preventDefault();
              //   }
              // }}
              container={body}
              size="xs"
              className="px-size-x"
              theme={refresh ? "info" : "neutral"}
            >
              {refresh ? "Refreshed!" : "Refresh Example"}
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger onClick={(e) => e.preventDefault()}>
              <Button
                variant="ghost"
                onClick={onCopy}
                theme={copied ? "info" : "neutral"}
                icon={
                  copied ? (
                    <HiCheck className="w-full h-full" />
                  ) : (
                    <HiOutlineClipboard className="w-full h-full" />
                  )
                }
                data-name="copy-btn"
              >
                Copy to clipboard
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content
              size="xs"
              className="px-size-x"
              theme={copied ? "info" : "neutral"}
              // onPointerDownOutside={(e) => {
              //   if (e.target instanceof HTMLElement && e.target.dataset?.name === "copy-btn") {
              //     e.preventDefault();
              //   }
              // }}
            >
              {copied ? "Copied!" : "Copy to clipboard"}
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger>
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
            </Tooltip.Trigger>

            <Tooltip.Content size="xs" className="px-size-x">
              {showCode ? "Hide code" : "Show code"}
            </Tooltip.Content>
          </Tooltip.Root>
        </div>
      </div>
      {showCode && (
        <div data-size="sm">
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
            <ThemeProvider theme="error" size="sm" className="bg-theme-base p-size-x relative">
              <Text className="font-mono">{params.errorProps.msg}</Text>
            </ThemeProvider>
          )}
        </div>
      )}
    </Card>
  );
};
