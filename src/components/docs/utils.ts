import { useView, Compiler, Editor, Error, PropTypes } from "react-view";

interface ComponentProp {
  name: string;
  type: PropTypes | string;
  description?: string;
  value: string | number | boolean | any;
  defaultValue?: string | number | boolean;
  placeholder?: string;
  options?: string[];
}

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

export const getInputType = (prop: ComponentProp) => {
  if (prop.type === "boolean") return "checkbox";
  if (prop.options) return "select";
  return "text";
};

export const getInputTypeTheme = (prop: ComponentProp) => {
  if (Object.keys(REACT_TYPE_MAP).includes(prop.type)) return "info";
  if (Object.keys(CUSTOM_TYPE_MAP).includes(prop.type)) return "brand";
  if (prop.type === "number") return "warning";
  return "neutral";
};

export const cleanDefaultProps = (
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
