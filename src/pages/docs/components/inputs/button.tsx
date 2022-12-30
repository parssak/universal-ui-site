import { Button, Card, Input, Select, Text, ThemeProvider } from "@parssa/universal-ui";
import { Theme } from "@parssa/universal-ui/dist/types";
import { isSSR, useResettableState } from "utils";

import { DocsLayout } from "components/docs/DocsLayout";
import React, { useMemo, useState } from "react";

import { useView, Compiler, Editor, Error, PropTypes } from "react-view";
import { useKeyDown } from "hooks";
import { ErrorBoundary } from "components/global/ui/ErrorBoundary";
import { HiCheck, HiEye, HiOutlineClipboard, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const REACT_TYPE_MAP = {
  [PropTypes.ReactNode]: "Any content React can render"
};

const CUSTOM_TYPE_MAP = {
  Variant: "solid | outline | ghost",
  Size: "xs | sm | md | lg | xl",
  Theme: "neutral | brand | success | error | warning | info",
  ColorVariant: "muted | light | dark",
  TextVariant: "p | h1 | h2 | h3 | h4 | h5 | h6 | code"
};

interface ComponentProp {
  name: string;
  type: PropTypes | string;
  description?: string;
  value: string | number | boolean | any;
  defaultValue?: string | number | boolean;
  placeholder?: string;
  options?: string[];
}

const ComponentConfig = ({
  componentProps,
  onPropChange
}: {
  componentProps: {
    [key: string]: ComponentProp;
  };
  onPropChange: (prop: ComponentProp) => void;
}) => {
  const getInputType = (prop: ComponentProp) => {
    if (prop.type === "boolean") return "checkbox";
    if (prop.options) return "select";
    return "text";
  };

  const getInputTypeTheme = (prop: ComponentProp) => {
    if (Object.keys(REACT_TYPE_MAP).includes(prop.type)) return "info";
    if (Object.keys(CUSTOM_TYPE_MAP).includes(prop.type)) return "brand";
    if (prop.type === "number") return "warning";
    return "neutral";
  };

  return (
    <Card className="bg-theme-base/20">
      <Card.Content>
        <div data-size="sm" className="divide-theme-active/30 divide-y">
          {Object.values(componentProps).map((prop) => (
            <div
              className="flex flex-col sm:flex-row gap-4 sm:items-center w-full mt-size-4y pt-size-4y first:pt-0 first:mt-0"
              key={prop.name}
            >
              <div>
                <div className="flex items-center gap-size-x">
                  <Text className="font-medium min-w-[10ch]">{prop.name}</Text>
                  <Text
                    size="xs"
                    variant="code"
                    className="opacity-75"
                    theme={getInputTypeTheme(prop)}
                  >
                    {prop.type === "react node" ? "ReactNode" : prop.type}
                  </Text>
                </div>
                {prop.description && (
                  <Text variant="p" colorVariant="muted" className="mt-size-y">
                    {prop.description}
                  </Text>
                )}
              </div>
              <div className="sm:ml-auto flex">
                {getInputType(prop) === "text" && (
                  <Input
                    className="flex-1"
                    value={prop.value as string | number}
                    type={prop.type}
                    onChange={(e) => {
                      onPropChange({
                        ...prop,
                        value: e.target.value
                      });
                    }}
                    placeholder={prop.placeholder}
                  />
                )}

                {getInputType(prop) === "select" && (
                  <Select
                    size="sm"
                    value={prop.value as string}
                    onValueChange={(e) => {
                      onPropChange({
                        ...prop,
                        value: e
                      });
                    }}
                  >
                    <Select.Trigger className="flex-1" />
                    <Select.Panel>
                      {prop.options.map((option) => (
                        <Select.Item
                          key={option}
                          value={option}
                          theme={prop.name === "theme" ? (option as Theme) : "neutral"}
                        >
                          {option}
                        </Select.Item>
                      ))}
                    </Select.Panel>
                  </Select>
                )}

                {getInputType(prop) === "checkbox" && (
                  <Select
                    size="sm"
                    value={`${prop.value}`}
                    onValueChange={(e) => {
                      onPropChange({
                        ...prop,
                        value: e === "true" ? true : false
                      });
                    }}
                  >
                    <Select.Trigger className="flex-1" />
                    <Select.Panel>
                      <Select.Item value={"true"}>true</Select.Item>
                      <Select.Item value={"false"}>false</Select.Item>
                    </Select.Panel>
                  </Select>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};

const CHILDREN_PROP: ComponentProp = {
  name: "children",
  type: PropTypes.ReactNode,
  description: "The content of the <COMPONENT>.", // The content of the <COMPONENT>
  value: "Button"
};

const THEME_PROP: ComponentProp = {
  name: "theme",
  type: "Theme",
  description: "The theme of the <COMPONENT>.", // The theme of the <COMPONENT>
  value: "neutral",
  defaultValue: "neutral",
  options: ["neutral", "brand", "success", "error", "warning", "info"]
};

const SIZE_PROP: ComponentProp = {
  name: "size",
  type: "Size",
  description: "The size of the <COMPONENT>.", // The size of the <COMPONENT>
  value: "md",
  defaultValue: "md",
  options: ["xs", "sm", "md", "lg", "xl"]
};

const VARIANT_PROP: ComponentProp = {
  name: "variant",
  type: "Variant",
  description: "The variant of the <COMPONENT>.", // The variant of the <COMPONENT>
  value: "solid",
  defaultValue: "solid",
  options: ["solid", "outline", "ghost"]
};

const DISABLED_PROP: ComponentProp = {
  name: "disabled",
  type: PropTypes.Boolean,
  description: "Whether the <COMPONENT> is disabled.", // Whether the <COMPONENT> is disabled
  value: false,
  defaultValue: false
};

const PREDEFINED_PROP_MAP = new Map(
  [CHILDREN_PROP, THEME_PROP, SIZE_PROP, VARIANT_PROP, DISABLED_PROP].map((prop) => [
    prop.name,
    prop
  ])
);

const cleanDefaultProps = (
  componentName: string,
  defaultProps: Array<string | ComponentProp>
): Record<string, ComponentProp> => {
  const cleanedProps: Record<string, ComponentProp> = {};

  let propName = "";
  defaultProps.forEach((prop) => {
    propName = typeof prop === "string" ? prop : prop.name;
    if (typeof prop === "string") {
      if (PREDEFINED_PROP_MAP.has(prop)) {
        const predefinedProp = PREDEFINED_PROP_MAP.get(prop);
        if (predefinedProp) {
          cleanedProps[prop] = predefinedProp;
        }
      } else {
        cleanedProps[prop] = {
          name: prop,
          type: "string",
          description: `The ${prop} of the <${componentName}>`,
          value: ""
        };
      }
    } else {
      cleanedProps[prop.name] = prop;
    }

    cleanedProps[propName].description = cleanedProps[propName].description.replace(
      /<COMPONENT>/g,
      componentName
    );
  });

  return cleanedProps;
};

const ComponentShowcase = ({
  componentName,
  defaultProps,
  title
}: {
  componentName: string;
  defaultProps: Array<ComponentProp | string>;
  title?: string;
}) => {
  const cleanedDefaultProps = useMemo(
    () => cleanDefaultProps(componentName, defaultProps),
    [componentName, defaultProps]
  );

  const params = useView({
    componentName: "Button",
    props: {
      ...Object.fromEntries(
        Object.entries(cleanedDefaultProps).map(([key, value]) => [
          key,
          {
            value: value.value,
            type: Object.values(PropTypes).find((type) => type === value.type) ?? PropTypes.String,
            description: value.description ?? "",
            defaultValue: value.defaultValue
          }
        ])
      )
    },
    scope: {
      Button
    }
  });

  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  useKeyDown("s", (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      params.actions.formatCode();
    }
  });

  const onCopy = () => {
    if (isSSR) return;
    setCopied(true);
    params.actions.copyCode();
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onShowCodeToggle = () => {
    setShowCode((prevShowCode) => !prevShowCode);
  };

  const propValues = Object.fromEntries(
    Object.entries(params.knobProps.state).map(([key, value]) => [key, value.value])
  );

  const injectedProps = Object.fromEntries(
    Object.entries(cleanedDefaultProps).map(([key, value]) => {
      return [
        key,
        {
          ...value,
          value: propValues[key]
        }
      ];
    })
  );

  return (
    <div className="space-y-size-4y">
      <Card className="bg-theme-pure/25 backdrop-blur-lg grid-pattern with-spotlight overflow-hidden">
        <div className="relative">
          {title && (
            <Text
              variant="h5"
              size="sm"
              className="absolute text-size text-theme-muted left-size-x top-size-2y font-medium px-size-qx py-size-qy rounded bg-theme-pure"
            >
              {title}
            </Text>
          )}
          <Card.Content
            className={`${title ? "py-size-2y" : "py-size-4y"} grid place-items-center `}
          >
            <div className="flex gap-2 items-center flex-col py-size-4y">
              <Compiler {...params.compilerProps} minHeight={62} />
            </div>
          </Card.Content>

          <div
            className="bottom-size-2y right-size-x absolute z-10 flex gap-size-hx"
            data-size="sm"
          >
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
              <span className="sr-only">Copy to clipboard</span>
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
              <span className="sr-only">Show code</span>
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
      <ComponentConfig
        componentProps={injectedProps}
        onPropChange={(prop) => {
          params.knobProps.set(prop.value, prop.name);
        }}
      />
    </div>
  );
};

export default function ButtonPage() {
  return (
    <DocsLayout className="relative">
      <DocsLayout.Header
        title="Button"
        description="Used to trigger actions and events. Y'know, like a button."
      />
      <div className="mt-size-4y space-y-size-4y">
        <ComponentShowcase
          componentName="Button"
          defaultProps={[
            "children",
            "theme",
            "size",
            "variant",
            "disabled",
            {
              name: "leadingIcon",
              type: PropTypes.ReactNode,
              description: "Icon shown before the content.",
              value: "",
              placeholder:
                '<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">'
            },
            {
              name: "trailingIcon",
              type: PropTypes.ReactNode,
              description: "Icon shown after the content.",
              value: "",
              placeholder:
                '<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">'
            },
            {
              name: "icon",
              type: PropTypes.ReactNode,
              description:
                "Renders a uniformly shaped button with a centered icon. Children is used as alt-text",
              value: "",
              placeholder:
                '<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">'
            }
          ]}
        />

        <Text variant="h2">Examples</Text>
      </div>
    </DocsLayout>
  );
}
