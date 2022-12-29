import { Button, Card, Input, Select, Text } from "@parssa/universal-ui";
import { Theme } from "@parssa/universal-ui/dist/types";
import { useResettableState } from "utils";

import { DocsLayout } from "components/docs/DocsLayout";
import { useMemo, useState } from "react";

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
  value: string | number | boolean;
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
  description: "The content inside the button",
  value: "Button"
};

const THEME_PROP: ComponentProp = {
  name: "theme",
  type: "Theme",
  description: "The theme of the button",
  value: "neutral",
  options: ["neutral", "brand", "success", "error", "warning", "info"]
};

const SIZE_PROP: ComponentProp = {
  name: "size",
  type: "Size",
  description: "The size of the button",
  value: "md",
  options: ["xs", "sm", "md", "lg", "xl"]
};

const VARIANT_PROP: ComponentProp = {
  name: "variant",
  type: "Variant",
  description: "The variant of the button",
  value: "solid",
  options: ["solid", "outline", "ghost"]
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

  const usableProps = useMemo(() => convertProps(props), [props]);

  return {
    props,
    setProps,
    hasChanged,
    resetProps,
    usableProps
  };
};

export default function ButtonPage() {
  const { props, setProps, usableProps } = useComponentProps({
    children: CHILDREN_PROP,
    theme: THEME_PROP,
    size: SIZE_PROP,
    variant: VARIANT_PROP
  });

  return (
    <DocsLayout className="relative">
      <DocsLayout.Header
        title="Button"
        description="Used to trigger actions and events. Y'know, like a button."
      />

      <Card className="my-size-4y bg-theme-pure/25 backdrop-blur-lg grid-pattern sticky top-4y">
        <Card.Content className="py-size-4y my-size-4y grid place-items-center">
          <div className="flex gap-2 items-center flex-col py-size-4y">
            <Button {...usableProps} />
          </div>
        </Card.Content>
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
    </DocsLayout>
  );
}
