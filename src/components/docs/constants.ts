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
      },
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
        title: "Text",
        href: "/docs/components/display/text"
      },
      {
        title: 'Tooltip',
        href: '/docs/components/display/tooltip'
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
      },
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
