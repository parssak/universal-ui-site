import { isSSR } from "utils";
import { useEffect } from "react";

export const useKeyDown = (key: string, callback: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback(event);
      }
    };

    if (!isSSR) {
      window.addEventListener("keydown", handler);
    }

    return () => {
      if (!isSSR) {
        window.removeEventListener("keydown", handler);
      }
    };
  }, [key, callback]);
};
