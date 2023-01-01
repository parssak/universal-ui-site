import { useKeyDown } from "hooks";
import { useMemo } from "react";
import { useView, PropTypes } from "react-view";
import { ComponentConfig } from "./ComponentConfig";
import { ComponentPreview } from "./ComponentPreview";
import { cleanDefaultProps } from "./utils";

export const ComponentPrimaryShowcase = ({
  componentName,
  defaultProps,
  imports,
  scope
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
}) => {
  const cleanedDefaultProps = useMemo(
    () => cleanDefaultProps(componentName, defaultProps),
    [componentName, defaultProps]
  );

  const params = useView({
    componentName,
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
      ...scope
    },
    imports: {
      ...imports
    }
  });

  useKeyDown("s", (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
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

  console.debug("rerender");

  return (
    <div className="space-y-size-4y">
      <ComponentPreview params={params} />

      <ComponentConfig
        componentProps={injectedProps}
        onPropChange={(prop) => {
          params.knobProps.set(prop.value, prop.name);
        }}
      />
    </div>
  );
};
