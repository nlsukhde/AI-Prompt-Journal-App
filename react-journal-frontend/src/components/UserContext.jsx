import React, { createContext, useContext, useState } from "react";

// Create a context
const UserContext = createContext(null);

// Export a hook that components can use to access the context
export const useUser = () => useContext(UserContext);

// Export a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
