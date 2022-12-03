import { useEffect, useState } from "react";
import { useMedia } from "./useMedia";

const usePrefersDarkMode = () => {
  return useMedia(["(prefers-color-scheme: dark)"], [true], false);
};

export const useDarkMode = () => {
  const prefersDarkMode = usePrefersDarkMode();

  const [enabledState, setEnabledState] = useState(prefersDarkMode);

  return [enabledState, setEnabledState];
};
