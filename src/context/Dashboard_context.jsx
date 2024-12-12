import { createContext, useState } from "react";

// Create Context
const MyContext = createContext(null);

// Create Provider
export const Dashboard_context = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const contextValue = {
    open,
    setOpen,
    searchQuery,
    setSearchQuery,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export default MyContext;
