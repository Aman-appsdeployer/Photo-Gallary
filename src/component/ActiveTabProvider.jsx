import { createContext, useContext, useEffect, useState } from "react";

const ActiveTabContext = createContext(undefined);

export const ActiveTabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(
    window.location.pathname + window.location.hash
  );

  useEffect(() => {
    const handleHashChange = () =>
      setActiveTab(window.location.pathname + window.location.hash);

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange); // handles back/forward
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};

export const useActiveTab = () => {
  const context = useContext(ActiveTabContext);
  if (!context) {
    throw new Error("useActiveTab must be used within ActiveTabProvider");
  }
  return context;
};
