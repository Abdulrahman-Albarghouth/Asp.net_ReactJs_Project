import { createContext, useState } from "react";
export const AuthContext = createContext();

const UserManager = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const signIn = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  };
  const signOut = () => {
    setUser({});
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default UserManager;
