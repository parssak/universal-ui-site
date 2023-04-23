import {
  Button,
  Card,
  Dialog,
  Input,
  InputGroup,
  Select,
  Text,
  ThemeProvider,
  UniversalUIConfigProvider
} from "@parssa/universal-ui";
import React, { useEffect, useRef, useState } from "react";

const t = ["info", "neutral", "warning", "brand"];

const purple = {
  "50": "#faf5ff",
  "100": "#f3e8ff",
  "200": "#e9d5ff",
  "300": "#d8b4fe",
  "400": "#c084fc",
  "500": "#a855f7",
  "600": "#9333ea",
  "700": "#7e22ce",
  "800": "#6b21a8",
  "900": "#581c87",
  "950": "#3b0764"
};
const DEFAULT_COLORS = [
  {
    "50": "#fafafa",
    "100": "#f5f5f5",
    "200": "#e5e5e5",
    "300": "#d4d4d4",
    "400": "#a3a3a3",
    "500": "#737373",
    "600": "#525252",
    "700": "#404040",
    "800": "#262626",
    "900": "#171717",
    "950": "#0a0a0a"
  },
  {
    "50": "#eef2ff",
    "100": "#e0e7ff",
    "200": "#c7d2fe",
    "300": "#a5b4fc",
    "400": "#818cf8",
    "500": "#6366f1",
    "600": "#4f46e5",
    "700": "#4338ca",
    "800": "#3730a3",
    "900": "#312e81",
    "950": "#1e1b4b"
  },
  {
    "50": "#fff1f2",
    "100": "#ffe4e6",
    "200": "#fecdd3",
    "300": "#fda4af",
    "400": "#fb7185",
    "500": "#f43f5e",
    "600": "#e11d48",
    "700": "#be123c",
    "800": "#9f1239",
    "900": "#881337",
    "950": "#4c0519"
  },
  {
    "50": "#ecfdf5",
    "100": "#d1fae5",
    "200": "#a7f3d0",
    "300": "#6ee7b7",
    "400": "#34d399",
    "500": "#10b981",
    "600": "#059669",
    "700": "#047857",
    "800": "#065f46",
    "900": "#064e3b",
    "950": "#022c22"
  },
  {
    "50": "#fff7ed",
    "100": "#ffedd5",
    "200": "#fed7aa",
    "300": "#fdba74",
    "400": "#fb923c",
    "500": "#f97316",
    "600": "#ea580c",
    "700": "#c2410c",
    "800": "#9a3412",
    "900": "#7c2d12",
    "950": "#431407"
  },
  {
    "50": "#f0f9ff",
    "100": "#e0f2fe",
    "200": "#bae6fd",
    "300": "#7dd3fc",
    "400": "#38bdf8",
    "500": "#0ea5e9",
    "600": "#0284c7",
    "700": "#0369a1",
    "800": "#075985",
    "900": "#0c4a6e",
    "950": "#082f49"
  }
];

function getRgbChannels(hex) {
  const padded = hex.length === 4 ? "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3] : hex;
  return padded
    .match(/\w\w/g)
    .map((x) => parseInt(x, 16))
    .join(" ");
}

const getColorsForTheme = (color, isDark = false, predefinedColors) => {
  const STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

  const colorArray = predefinedColors ?? DEFAULT_COLORS[color];
  // console.debug(colorArray)
  const colorMap = (light, dark) => colorArray[STEPS[isDark ? dark : light]];

  return {
    "text-muted": colorMap(5, 4),
    "text-base": colorMap(8, 0),
    "text-active": colorMap(10, 2),
    "text-inverted": colorMap(0, 8),
    "bg-pure": isDark ? "0 0 0" : "255 255 255",
    "bg-muted": colorMap(0, 10),
    "bg-base": colorMap(1, 9),
    "bg-active": colorMap(2, 8),
    "bg-inverted": colorMap(9, 1),
    "border-muted": colorMap(2, 8),
    "border-base": colorMap(3, 7),
    "border-active": colorMap(4, 6),
    "border-inverted": colorMap(7, 3)
  };
};

const keys = [
  "button",
  "checkbox",
  "input-group",
  "input",
  "input_inner",
  "select.trigger",
  "select.panel",
  "select.item",
  "select.item_text",
  "text",
  "card",
  "card.content",
  "dialog",
  "dialog_overlay",
  "dialog_root",
  "dialog.content",
  "dialog.title",
  "tooltip.trigger",
  "tooltip.content",
  "tooltip.content_arrow",
  "popover",
  "popover.trigger",
  "popover.content",
  "popover.content_arrow"
];

const RAW = {
  card: ({ theme }) => {
    if (!theme || theme === "neutral") return "bg-theme-pure";
    return "";
  }
};

const MINIMAL = {
  button: ({ variant, theme }) => {
    let classNames = "";
    if (!variant || variant === "solid") {
      classNames += "border-0 ";
    }
    if (theme === "brand" || ((theme === "neutral" || !theme) && variant === "solid")) {
      classNames +=
        "bg-theme-inverted text-theme-inverted enabled:hover:bg-black enabled:hover:text-white is-dark:enabled:hover:bg-white is-dark:enabled:hover:text-black ";
    }
    return classNames;
  }
};

const PLAYFUL = {
  button: ({ variant, theme }) => {
    let classNames = "rounded-xl ";
    if (!variant || variant === "solid") {
      classNames += "border-0 ";
    }
    if (theme === "brand" || ((theme === "neutral" || !theme) && variant === "solid")) {
      classNames +=
        "bg-theme-inverted text-theme-inverted enabled:hover:bg-black enabled:hover:text-white is-dark:enabled:hover:bg-white is-dark:enabled:hover:text-black ";
    }
    return classNames;
  },
  input: ({ variant, theme }) => {
    const base = "rounded-xl border-2 ";
    return base;
  },
  "select.trigger": () => {
    return "rounded-xl border-2 ";
  },
  "select.panel": () => {
    return "rounded-xl";
  },
  "select.item": () => {
    return "first:rounded-t-lg last:rounded-b-lg rounded-md";
  },
  card: ({ theme }) => {
    return "rounded-3xl border-2 border-theme-active";
  }
};

const SERIOUS = {
  button: ({ variant, theme }) => {
    const base = "rounded-none";
    return base;
  },
  input: ({ variant, theme }) => {
    const base = "rounded-none";
    return base;
  },
  card: ({ theme }) => {
    return "rounded-none";
  }
};

const COMPONENTS_THEME = {
  RAW,
  MINIMAL,
  PLAYFUL,
  SERIOUS
};

const TestPage = () => {
  const [componentsTheme, setComponentsTheme] = useState("RAW");
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const c = [
      "--color-text-muted",
      "--color-text-base",
      "--color-text-active",
      "--color-text-inverted",
      "--color-bg-pure",
      "--color-bg-muted",
      "--color-bg-base",
      "--color-bg-active",
      "--color-bg-inverted",
      "--color-border-muted",
      "--color-border-base",
      "--color-border-active",
      "--color-border-inverted"
    ];

    const colorMap = c.reduce((acc, cur) => {
      const color = window.getComputedStyle(container).getPropertyValue(cur);
      acc[cur] = color;
      return acc;
    }, {});

    console.debug(colorMap);

    return () => {};
  }, []);

  return (
    <div className="container p-12" ref={ref}>
      <UniversalUIConfigProvider
        key={componentsTheme}
        config={{
          components: COMPONENTS_THEME[componentsTheme],
          providers: {
            theme: {
              dark: false,
              theme: "neutral"
            }
          }
        }}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3  p-6">
          <Card>
            <Card.Content className="h-full flex flex-col">
              <Text variant="h4">Notifications</Text>
              <Text className="text-theme-muted">Choose what you want to be notified about.</Text>
              <div className="my-auto py-size-x">
                <Select>
                  <Select.Trigger className="w-full" />
                  <Select.Panel>
                    <Select.Item value="everything">Everything</Select.Item>
                    <Select.Item value="some-things">Some things</Select.Item>
                    <Select.Item value="nothing">Nothing</Select.Item>
                  </Select.Panel>
                </Select>
              </div>

              <div className="flex gap-size-y justify-end mt-auto">
                <Button variant="ghost">Cancel</Button>
                <Button variant="outline">Cancel</Button>
                <Button>Submit</Button>
                <Button variant="solid" theme="neutral">
                  Submit
                </Button>
              </div>
            </Card.Content>
          </Card>
          <div className="grid grid-cols-2 gap-size-x items-start">
            <Text as="label">
              <span data-size="sm" className="text-size block font-medium mb-size-hy">
                First Name
              </span>
              <Input className="w-full" />
            </Text>
            <Text as="label">
              <span data-size="sm" className="text-size block font-medium mb-size-hy">
                Last Name
              </span>
              <Input className="w-full" />
            </Text>
            <Text as="label" className="col-span-2">
              <span data-size="sm" className="text-size block font-medium mb-size-hy">
                Email
              </span>
              <Input className="w-full" type="email" />
            </Text>
            <div className="col-span-2">
              <Button theme="brand" className="w-full">
                Submit
              </Button>
            </div>
          </div>
          <div className="space-y-size-x">
            <Card className="border-0 bg-theme-base " theme="error">
              <Card.Content className="flex items-stretch justify-between">
                <div>
                  <Text variant="h6">Something needs your attention</Text>
                  <Text className="text-theme-active" size="sm">
                    There's an issue with your account.
                  </Text>
                </div>
                <Button size="sm" variant="ghost">
                  View &rarr;
                </Button>
              </Card.Content>
            </Card>
            <Card className="border-0 bg-theme-base " theme="info">
              <Card.Content className="flex items-stretch justify-between">
                <div>
                  <Text variant="h6">An update is now available</Text>
                  <Text className="text-theme-active" size="sm">
                    Update to get the latest features.
                  </Text>
                </div>
                <Button size="sm" variant="ghost">
                  Update &rarr;
                </Button>
              </Card.Content>
            </Card>
            <Card className="border-0 bg-theme-base " theme="success">
              <Card.Content className="flex items-stretch justify-between">
                <div>
                  <Text variant="h6">Changes saved</Text>
                  <Text className="text-theme-active" size="sm">
                    You are up to date.
                  </Text>
                </div>
                <Button size="sm" variant="ghost">
                  Got it
                </Button>
              </Card.Content>
            </Card>
          </div>
        </div>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
          <Dialog.Content>
            <Dialog.Title>Notifications</Dialog.Title>
            <Dialog.Description className="text-theme-muted">
              Choose what you want to be notified about.
            </Dialog.Description>
            <div className="my-auto py-size-x">
              <Select>
                <Select.Trigger className="w-full" />
                <Select.Panel>
                  <Select.Item value="everything">Everything</Select.Item>
                  <Select.Item value="some-things">Some things</Select.Item>
                  <Select.Item value="nothing">Nothing</Select.Item>
                </Select.Panel>
              </Select>
            </div>

            <div className="flex gap-size-y justify-end mt-auto">
              <Button onClick={() => setOpen(false)} variant="ghost">
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Submit</Button>
            </div>
          </Dialog.Content>
        </Dialog>
      </UniversalUIConfigProvider>
      <div>
        <InputGroup>
          <Button onClick={() => setComponentsTheme("RAW")}>Standard</Button>
          <Button onClick={() => setComponentsTheme("MINIMAL")}>Minimal</Button>
          <Button onClick={() => setComponentsTheme("PLAYFUL")}>Playful</Button>
          <Button onClick={() => setComponentsTheme("SERIOUS")}>Serious</Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default TestPage;
