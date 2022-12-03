import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  classGroups: {
    "font-size": [{ text: ["size"] }],
    "padding-left": [{ pl: ["size-x", "size-y", "size-2x", "size-2y"] }],
    "padding-right": [{ pr: ["size-x", "size-y", "size-2x", "size-2y"] }]
  }
});

export const cx = (...classes: Array<string | undefined | false | null>) => {
  return twMerge(
    Array.from(classes)
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ") // remove extra whitespace
      .trim()
  );
};
