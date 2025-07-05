import { createContext, useState, useContext } from "react";
import { Session } from "@ssaquif/rock-paper-wizard-api-types-and-schema";
// TODO: think about how this can be typed
// consider sessions and cookies
// fix the any typings
interface IAuthContext {
  auth: Session | null;
  setAuth: React.Dispatch<React.SetStateAction<Session | null>>;
}

export const AuthContext = createContext<IAuthContext>({
  auth: null,
  setAuth: () => {
    console.warn("setAuth was called outside of AuthProvider");
    throw new Error("setAuth was used outside of AuthProvider");
  },
});

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  // might switch to useReducer
  const [auth, setAuth] = useState<Session | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used in a Component within a AuthProvider"
    );
  }
  return context;
}

export function isValidSession(session: Session | null | undefined): boolean {
  if (!session) {
    return false;
  }
  if (!session.user_id || !session.session_id || !session.expires_at) {
    return false;
  }
  const currentTime = new Date().getTime();
  const sessionExpiryTime = new Date(session.expires_at).getTime();
  return currentTime < sessionExpiryTime;
}
