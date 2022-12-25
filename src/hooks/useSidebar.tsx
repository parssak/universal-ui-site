import React, { createContext, useContext } from "react";

export const SidebarContext = createContext({
  isSidebarOpen: false,
  toggleSidebar: () => {}
});

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
