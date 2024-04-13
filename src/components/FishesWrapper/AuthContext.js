import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const useAuthCont = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const storedIsAuth = localStorage.getItem("isAuth");
    setIsAuth(storedIsAuth === "true");
  }, []);

  const login = () => {
    setIsAuth(true);
    localStorage.setItem("isAuth", "true");
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.setItem("isAuth", "false");
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
