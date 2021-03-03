import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/api";
import Cookies from "js-cookie";

interface User {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
  code: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  user: User;
  token: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = Cookies.get("token");
    const user = Cookies.get("user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ token, user }) => {
    // const { token, user } = response.data;

    Cookies.set("token", token);
    Cookies.set("user", JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    Cookies.remove("token");
    Cookies.remove("user");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
