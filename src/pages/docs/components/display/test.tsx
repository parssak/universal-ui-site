import { Button, Card, Text } from "@parssa/universal-ui";
import React, { useEffect, useRef, useState } from "react";

const t = ["info", "neutral", "warning", "brand"];

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

const TestPage = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [colorTextMuted, setColorTextMuted] = useState("255 0 0");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [colors, setColors] = useState({});
  const [themes, setThemes] = useState<Record<string, Record<string, string>>>({});
  const [theme, setTheme] = useState("info");

  useEffect(() => {
    // if (!sectionRef.current || Object.keys(colors).length > 0) return;

    const section = sectionRef.current;
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
      const color = window.getComputedStyle(section).getPropertyValue(cur);
      acc[cur] = color;
      return acc;
    }, {});

    setColors(colorMap);

    return () => {};
  }, [sectionRef, theme]);

  return (
    <div className="container p-12">
      <pre>
        <code>{JSON.stringify(themes, null, 2)}</code>
      </pre>
      {["info", "neutral", "warning", "brand"].map((key) => (
        <Button
          key={key}
          onClick={() => {
            setTheme(key);
          }}
        >
          {key}
        </Button>
      ))}
      <section ref={sectionRef} data-theme={theme}>
        <div className="grid gap-4">
          {Object.keys(colors).map((key) => (
            <div key={key}>
              <div
                className="w-5 h-5"
                style={{
                  backgroundColor: `rgb(${colors[key]})`
                }}
              ></div>
            </div>
          ))}
        </div>
        <div data-dark="false" className="grid grid-cols-4">
          <Card theme="neutral">
            <Card.Content>
              <Text>Welcome to Universal UI</Text>
            </Card.Content>
          </Card>
          <Card theme="success">
            <Card.Content>
              <Text>Saved all changes</Text>
            </Card.Content>
          </Card>
          <Card theme="info">
            <Card.Content>
              <Text>Member added to team</Text>
            </Card.Content>
          </Card>
          <Card theme="error">
            <Card.Content>
              <Text>Something went wrong</Text>
            </Card.Content>
          </Card>
        </div>
        <div data-dark="true" className="grid grid-cols-4">
          <Card theme="neutral">
            <Card.Content>
              <Text>Welcome to Universal UI</Text>
            </Card.Content>
          </Card>
          <Card theme="success">
            <Card.Content>
              <Text>Saved all changes</Text>
            </Card.Content>
          </Card>
          <Card theme="info">
            <Card.Content>
              <Text>Member added to team</Text>
            </Card.Content>
          </Card>
          <Card theme="error">
            <Card.Content>
              <Text>Something went wrong</Text>
            </Card.Content>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default TestPage;
