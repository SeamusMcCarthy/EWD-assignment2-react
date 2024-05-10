import React, { useState, useContext } from "react";
import { awsLogin } from "../api/tmdb-api";
// import { useNavigate } from "react-router-dom";

interface AuthContextInterface {
  user: string;
  token: string | null;
  login: (userName: string, password: string) => void;
  logout: () => void;
}

const initialContextState = {
  user: "",
  token: "",
  error: "",
  login: (userName: string, password: string) => {
    userName;
  },
  logout: () => {},
};

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContext =
  React.createContext<AuthContextInterface>(initialContextState);

const AuthContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [user, setUser] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  // const navigate = useNavigate();

  function login(userName: string, password: string) {
    return awsLogin(userName, password)
      .then((json) => {
        if (json.token) {
          setUser(userName);
          setToken(json.token);
          localStorage.setItem("token", json.token);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      });
  }

  function logout() {
    setUser("");
    setToken(null);
    localStorage.removeItem("token");
  }

  const value = {
    user,
    token,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
