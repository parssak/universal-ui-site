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
        href: "/docs/customization"
      }
    ]
  },
  {
    title: "Components",
    items: [
      {
        title: "Button",
        href: "/docs/components/button"
      },
      {
        title: "Text",
        href: "/docs/components/text"
      },
      {
        title: "Input",
        href: "/docs/components/input"
      },
      {
        title: "Card",
        href: "/docs/components/card"
      }
    ]
  }
] as ReadonlyArray<NavSection>;
