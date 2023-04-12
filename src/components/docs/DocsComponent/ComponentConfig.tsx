import { Card, Input, Select, Text } from "@parssa/universal-ui";
import { Theme } from "@parssa/universal-ui/dist/types";
import { getInputType, getInputTypeTheme } from "./utils";

export const ComponentConfig = ({
  componentProps,
  onPropChange
}: {
  componentProps: {
    [key: string]: ComponentProp;
  };
  onPropChange: (prop: ComponentProp) => void;
}) => {
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
                  <Text variant="p" className="mt-size-y text-theme-muted">
                    {prop.description}
                  </Text>
                )}
              </div>
              {!prop.noEdit ? (
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
              ) : (
                <div className="sm:ml-auto flex">
                  <Text variant="p" className="mt-size-y text-theme-muted">
                    *Can't edit{" "}
                    <Text variant="code" size="xs">
                      {prop.type}
                    </Text>{" "}
                    values here
                  </Text>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};
