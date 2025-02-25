import { createContext, useState, useContext } from "react";

// TODO: think about how this can be typed
// consider sessions and cookies
// fix the any typings
interface IUserContext {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = createContext<IUserContext | null>(null);

export function UserProvider({ children }: React.PropsWithChildren<{}>) {
  // might switch to useReducer
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useUser must be used in a Component within a UserProvider"
    );
  }
  return context;
}
