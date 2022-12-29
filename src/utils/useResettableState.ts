import { useMemo, useState } from "react";
import equal from "fast-deep-equal";

export const useResettableState = <T>(initialState: T) => {
  const [state, setState] = useState(initialState);
  const reset = () => setState(initialState);
  const isEqual = useMemo(() => equal(state, initialState), []);
  return [state, setState, isEqual, reset] as const;
};
