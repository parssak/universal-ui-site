import { useEffect } from "react";
import { useState } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState("/");

  useEffect(() => {
    setLocation(window.location.pathname);
  }, []);

  return location;
};
