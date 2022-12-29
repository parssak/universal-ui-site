import { Button, Card, Input, Select, Text } from "@parssa/universal-ui";
import { Theme } from "@parssa/universal-ui/dist/types";
import { useResettableState } from "utils";

import { DocsLayout } from "components/docs/DocsLayout";
import React, { useMemo } from "react";
import { CodeBlock } from "components/global/ui/CodeBlock";

const PRIMITIVE_TYPES = ["string", "number", "boolean"] as const;
type PropType = typeof PRIMITIVE_TYPES[number];

const REACT_TYPE_MAP = {
  "React.ReactNode": "Any content React can render",
  "React.ReactElement": "Any React element"
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
  type: PropType | string;
  description?: string;
  value: string | number | boolean | any;
  defaultValue?: string | number | boolean;
  options?: string[];
}

const ComponentConfig = ({
  componentProps,
  onPropChange
}: {
  componentProps: Record<string, ComponentProp>;
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
    <Card className="bg-theme-pure">
      <Card.Content className="divide-theme-active/30 divide-y">
        {Object.values(componentProps).map((prop) => (
          <div
            data-size="sm"
            className="flex flex-col sm:flex-row gap-4 sm:items-center w-full mt-size-2y pt-size-2y first:pt-0 first:mt-0"
            key={prop.name}
          >
            <div>
              <div className="flex gap-size-2x">
                <Text className="font-medium min-w-[8ch]">{prop.name}</Text>
                <Text
                  size="xs"
                  variant="code"
                  className="opacity-75 pt-[0.17rem]"
                  theme={getInputTypeTheme(prop)}
                >
                  {prop.type}
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
  type: "React.ReactNode",
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

interface Component {
  name: string;
  props: Record<string, ComponentProp>;
}

const convertPropsArray = (props: ComponentProp[]) => {
  return props
    .map((prop) => {
      if (prop.type === "boolean") {
        return prop.value ? prop.name : "";
      }

      if (prop.type === "string" && prop.value === "") {
        return "";
      }

      if (prop.value === undefined || prop.value === prop.defaultValue) {
        return "";
      }

      return `${prop.name}="${prop.value}"`;
    })
    .filter((prop) => prop !== "");
};

// const LINE_BREAK = "\n\t";
const MAX_HEADER_STR_LENGTH = 40;

const formatComponent = ({ name, props }: Component, tabIndex: number) => {
  const hasChildren = Object.keys(props).includes("children");
  const propsWithoutChildren = Object.values(props).filter((prop) => prop.name !== "children");

  const propsArray = convertPropsArray(propsWithoutChildren);

  const LEADING_TABS = "\t".repeat(tabIndex);
  const LINE_BREAK = "\n" + "\t".repeat(tabIndex + 1);
  const START = `${LEADING_TABS}<${name}`;
  const hasLineBreak = (START + " " + propsArray.join(" ")).length > MAX_HEADER_STR_LENGTH;

  let propStr = propsArray.join(hasLineBreak ? LINE_BREAK : " ");

  if (hasLineBreak) {
    propStr = LINE_BREAK + propStr;
  }

  if (!hasChildren) {
    return `${START}${propStr ? ` ${propStr}` : ""} />`;
  }

  const END = `${hasLineBreak ? LINE_BREAK.slice(0, -1) : ""}>${
    hasLineBreak ? LINE_BREAK.slice(0, -1) : "\n"
  }${
    Array.isArray(props.children?.value)
      ? formatJSXTree(props.children.value, tabIndex + 1)
      : props.children.value
  }${hasLineBreak ? "\n" : ""}</${name}>`;

  if (hasChildren) {
    return `${START}${propStr ? ` ${propStr}` : ""}${END}`;
  }
};

const formatJSXTree = (componentTree: Component[], tabIndex = 0) => {
  return componentTree.map((component) => formatComponent(component, tabIndex)).join("\n");
};

const useComponentProps = (defaultProps: Record<string, ComponentProp>) => {
  const [props, setProps, hasChanged, resetProps] = useResettableState(defaultProps);

  const convertProps = (props: Record<string, ComponentProp>) => {
    const usableProps: Record<string, any> = {};
    Object.values(props).forEach((prop) => {
      usableProps[prop.name] = prop.value;
    });
    return usableProps;
  };

  const usableProps = useMemo(() => {
    return convertProps(props);
  }, [props]);

  return {
    props,
    setProps,
    hasChanged,
    resetProps,
    usableProps
  };
};

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
  children,
  componentName,
  defaultProps,
  title
}: {
  children: React.ReactNode;
  componentName: string;
  defaultProps: Array<ComponentProp | string>;
  title?: string;
}) => {
  const { props, setProps, usableProps } = useComponentProps(
    cleanDefaultProps(componentName.toLowerCase(), defaultProps)
  );

  return (
    <div className="space-y-size-2y">
      <Card className="bg-theme-pure/25 backdrop-blur-lg grid-pattern overflow-hidden relative">
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
            {React.cloneElement(children as React.ReactElement, {
              ...usableProps
            })}
          </div>
        </Card.Content>
        <CodeBlock className="border-0 border-t rounded-none border-theme-base/30">
          {formatJSXTree([
            {
              name: "div",
              props: {
                className: {
                  name: "className",
                  type: "string",
                  value: "flex"
                },
                children: {
                  name: "children",
                  type: "React.ReactNode",
                  value: [
                    {
                      name: componentName,
                      props
                    },
                    {
                      name: componentName,
                      props: {}
                    }
                  ]
                }
              }
            }
          ])}
        </CodeBlock>
      </Card>
      <ComponentConfig
        componentProps={props}
        onPropChange={(prop) => {
          setProps((prev) => {
            return {
              ...prev,
              [prop.name]: prop
            };
          });
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
          defaultProps={["children", "theme", "size", "variant"]}
        >
          <Button>Click me!</Button>
        </ComponentShowcase>
        <Text variant="h2">Examples</Text>
        {/* <ComponentShowcase
          title="Buttons with Leading and Trailing Icons"
          componentName="button"
          defaultProps={["children", "theme", "size", "variant"]}
        /> */}
      </div>
    </DocsLayout>
  );
}
