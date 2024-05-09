import React, { useState, useContext } from "react";
import { awsLogin } from "../api/tmdb-api";
import { useNavigate } from "react-router-dom";

interface AuthContextInterface {
  user: string;
  token: string;
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
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  async function login(userName: string, password: string) {
    return await awsLogin(userName, password)
      .then((json) => {
        // console.log("JSON object ", json);
        if (json.token) {
          setUser(userName);
          setToken(json.token);
          navigate("/");
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
    setToken("");
    navigate("/");
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
