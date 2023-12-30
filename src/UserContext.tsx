import { createContext, ReactNode } from "react";
import { firebaseAuth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { getUserData } from "./services/userAPI";
import { User as UserType } from "./services/userAPI";

interface UserContextProps {
  userData: UserType;
  isAuthenticated: boolean;
}

const defaultContext: UserContextProps = {
  userData: {
    id: "",
    name: "",
    surname: "",
    email: "",
    category: "",
  },
  isAuthenticated: false,
};

export const UserContext = createContext<UserContextProps>(defaultContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user] = useAuthState(firebaseAuth);
  const [userData, setUserData] = useState<any>(defaultContext);
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    if (!user) return;
    getUserData(user?.uid).then((data) => {
      setUserData(data);
    });
  }, [user]);

  return (
    <UserContext.Provider value={{ userData, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
