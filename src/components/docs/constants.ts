interface NavSection {
  title: string;
  items: {
    title: string;
    href: string;
  }[];
}

export const NAV_SECTIONS = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Installation",
        href: "/docs/getting-started"
      },
      {
        title: "Customization",
        href: "/docs/getting-started/customization"
      }
    ]
  },
  {
    title: "Inputs",
    items: [
      {
        title: "Button",
        href: "/docs/components/inputs/button"
      },
      {
        title: "Checkbox",
        href: "/docs/components/inputs/checkbox"
      },
      {
        title: "Input",
        href: "/docs/components/inputs/input"
      },
      {
        title: "InputGroup",
        href: "/docs/components/inputs/input-group"
      },
      {
        title: "Select",
        href: "/docs/components/inputs/select"
      }
    ]
  },
  {
    title: "Display",
    items: [
      {
        title: "Card",
        href: "/docs/components/display/card"
      },
      {
        title: "Dialog",
        href: "/docs/components/display/dialog"
      },
      {
        title: "Text",
        href: "/docs/components/display/text"
      },
      {
        title: "Tooltip",
        href: "/docs/components/display/tooltip"
      },
      {
        title: "Popover",
        href: "/docs/components/display/popover"
      }
    ]
  },
  {
    title: "Utilities",
    items: [
      {
        title: "Colors",
        href: "/docs/utilities/colors"
      },
      {
        title: "Spacing",
        href: "/docs/utilities/spacing"
      }
      // {
      //   title: "Classes 🚧",
      //   href: "/docs/utilities/classes"
      // },
      // {
      //   title: "ThemeProvider 🚧",
      //   href: "/docs/utilities/theme-provider"
      // }
    ]
  }
] as ReadonlyArray<NavSection>;

export const FRUITS = [
  "Apple",
  "Banana",
  "Orange",
  "Pineapple",
  "Mango",
  "Grape",
  "Watermelon",
  "Pear",
  "Peach",
  "Cherry",
  "Strawberry",
  "Kiwi",
  "Blueberry",
  "Raspberry",
  "Blackberry",
  "Apricot",
  "Avocado",
  "Coconut",
  "Fig",
  "Lemon",
  "Lime",
  "Melon",
  "Nectarine",
  "Papaya"
];

export const themes = ["neutral", "brand", "error", "warning", "success", "info"];
