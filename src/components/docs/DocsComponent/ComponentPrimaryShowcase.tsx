import { useKeyDown } from "hooks";
import { cloneElement, useEffect, useMemo } from "react";
import { useView, PropTypes } from "react-view";
import { ComponentConfig } from "./ComponentConfig";
import { ComponentPreview } from "./ComponentPreview";
import { cleanDefaultProps } from "./utils";

export const ComponentPrimaryShowcase = ({
  componentName,
  defaultProps,
  imports,
  scope,
  customRender,
  initialCode
}: {
  componentName: string;
  defaultProps: Array<ComponentProp | string>;
  imports?: {
    [key: string]: {
      named?: string[];
      default?: string;
    };
  };
  scope?: {
    [key: string]: any;
  };
  customRender?: React.ReactNode;
  initialCode?: string;
}) => {
  const cleanedDefaultProps = useMemo(
    () => cleanDefaultProps(componentName, defaultProps),
    [componentName, defaultProps]
  );

  const params = useView({
    componentName,
    initialCode,
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
      // children: {
      //   name: "children",
      //   type: PropTypes.ReactNode,
      //   description: "Icon shown after the content.",
      //   value: <>hello</>,
      //   placeholder: '<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">'
      // }
    },
    scope: {
      ...scope
    },
    imports: {
      ...imports
    }
  });

  useEffect(() => {
    if (params.errorProps.msg) {
      return;
    }
  }, []);

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
      <ComponentPreview
        params={params}
        customRender={
          customRender
            ? cloneElement(customRender as React.ReactElement, {
                ...Object.fromEntries(
                  Object.entries(injectedProps).map(([key, value]) => [key, value.value])
                )
              })
            : undefined
        }
      />

      <ComponentConfig
        componentProps={injectedProps}
        onPropChange={(prop) => {
          params.knobProps.set(prop.value, prop.name);
        }}
      />
    </div>
  );
};
