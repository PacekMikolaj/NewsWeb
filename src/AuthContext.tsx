import { createContext, ReactNode } from "react";
import { User } from "firebase/auth";
import { firebaseAuth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface AuthContextProps {
  user: User | null | undefined;
  isAuthenticated: boolean;
}

const defaultContext: AuthContextProps = {
  user: null,
  isAuthenticated: false,
};

export const AuthContext = createContext<AuthContextProps>(defaultContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user] = useAuthState(firebaseAuth);
  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
