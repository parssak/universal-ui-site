const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/pages/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./node_modules/@parssa/universal-ui/src/components/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"]
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem"
      },
      center: true
    },
    extend: {
      transitionTimingFunction: {
        spring: "cubic-bezier(.175,.885,.32,1.275)"
      }
    },
    // universalUI: {
    //   themes: [
    //     {
    //       name: "brand",
    //       colors: colors.purple
    //     }
    //   ]
    // }
  },
  variants: {},
  plugins: [require("@parssa/universal-ui/src/plugin")]
};
