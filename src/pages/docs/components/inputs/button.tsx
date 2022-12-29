import { Button, Card, Input, Select, Text } from "@parssa/universal-ui";
import { Theme } from "@parssa/universal-ui/dist/types";
import { useResettableState } from "utils";

import { DocsLayout } from "components/docs/DocsLayout";
import React from "react";

import { useView, Compiler, Editor, Error, PropTypes } from "react-view";
import { useKeyDown } from "hooks";
import { ErrorBoundary } from "components/global/ui/ErrorBoundary";

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
  options?: string[];
}

const ComponentConfig = ({
  componentProps,
  onPropChange
}: {
  componentProps: {
    [key: string]: {
      name: string;
      type: PropTypes | string;
      description?: string;
      value: string | number | boolean | any;
      defaultValue?: string | number | boolean;
      options?: string[];
    };
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
    <Card className="bg-theme-pure" data-size="sm">
      <Card.Content className="divide-theme-active/30 divide-y">
        {Object.values(componentProps).map((prop) => (
          <div
            className="flex flex-col sm:flex-row gap-4 sm:items-center w-full mt-size-2y pt-size-2y first:pt-0 first:mt-0"
            key={prop.name}
          >
            <div>
              <div className="flex items-center gap-size-2x">
                <Text className="font-medium min-w-[8ch]">{prop.name}</Text>
                <Text
                  size="xs"
                  variant="code"
                  className="opacity-75 leading-none"
                  theme={getInputTypeTheme(prop)}
                >
                  {prop.type === "react node" ? "ReactNode" : prop.type}
                </Text>
              </div>
              <Text variant="p" colorVariant="muted" className="mt-size-2y">
                {prop.description}
              </Text>
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
            </div>
          </div>
        ))}
      </Card.Content>
    </Card>
  );
};

const CHILDREN_PROP: ComponentProp = {
  name: "children",
  type: PropTypes.ReactNode,
  description: "The content inside the <COMPONENT>",
  value: "Button"
};

const THEME_PROP: ComponentProp = {
  name: "theme",
  type: "Theme",
  description: "The theme of the <COMPONENT>",
  value: "neutral",
  defaultValue: "neutral",
  options: ["neutral", "brand", "success", "error", "warning", "info"]
};

const SIZE_PROP: ComponentProp = {
  name: "size",
  type: "Size",
  description: "The size of the <COMPONENT>",
  value: "md",
  defaultValue: "md",
  options: ["xs", "sm", "md", "lg", "xl"]
};

const VARIANT_PROP: ComponentProp = {
  name: "variant",
  type: "Variant",
  description: "The variant of the <COMPONENT>",
  value: "solid",
  defaultValue: "solid",
  options: ["solid", "outline", "ghost"]
};

const PREDEFINED_PROP_MAP = new Map<string, ComponentProp[]>(
  [CHILDREN_PROP, THEME_PROP, SIZE_PROP, VARIANT_PROP].map((prop) => [prop.name, [prop]])
);

const cleanDefaultProps = (
  componentName: string,
  defaultProps: Array<string | ComponentProp>
): Record<string, ComponentProp> => {
  const cleanedProps: Record<string, ComponentProp> = {};

  defaultProps.forEach((prop) => {
    if (typeof prop === "string") {
      if (PREDEFINED_PROP_MAP.has(prop)) {
        const predefinedProps = PREDEFINED_PROP_MAP.get(prop);
        if (predefinedProps) {
          predefinedProps.forEach((predefinedProp) => {
            cleanedProps[predefinedProp.name] = predefinedProp;

            cleanedProps[predefinedProp.name].description = cleanedProps[
              predefinedProp.name
            ].description.replace("<COMPONENT>", componentName);
          });
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
  const cleanedDefaultProps = cleanDefaultProps(componentName, defaultProps);

  const params = useView({
    componentName: "Button",
    props: {
      ...Object.fromEntries(
        Object.entries(cleanedDefaultProps).map(([key, value]) => [
          key,
          {
            value: value.value,
            type: Object.values(PropTypes).find((type) => type === value.type) ?? PropTypes.String,
            description: value.description ?? ""
          }
        ])
      )
    },
    scope: {
      Button
    }
  });

  console.debug(params, Object.values(PropTypes));

  useKeyDown("s", (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();

      // format code params.actions.formatCode();

      params.actions.formatCode();
    }
  });

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
      <Card
        className="bg-theme-pure/25 backdrop-blur-lg grid-pattern overflow-hidden relative"
        data-size="sm"
      >
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
          className={`${title ? "py-size-2y" : "py-size-4y my-size-4y"} grid place-items-center `}
        >
          <div className="flex gap-2 items-center flex-col py-size-4y">
            <Compiler {...params.compilerProps} minHeight={62} />
          </div>
        </Card.Content>

        <div
          onBlurCapture={(e) => {
            if (e.relatedTarget === null) {
              params.actions.formatCode();
            }
          }}
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
            className="border-t border-theme-base/20"
          />
          <Error {...params.errorProps} />
        </div>
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
        <ErrorBoundary>
          <ComponentShowcase
            componentName="Button"
            defaultProps={["children", "theme", "size", "variant"]}
          />
        </ErrorBoundary>
        <Text variant="h2">Examples</Text>
      </div>
    </DocsLayout>
  );
}
