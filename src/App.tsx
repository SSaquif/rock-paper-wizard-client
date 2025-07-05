import { useEffect } from "react";
// import globalStyles from "./GlobalStyles";
import { styled } from "./stitches-theme";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { isValidSession, useAuthContext } from "./context/AuthContext";
import { Session } from "@ssaquif/rock-paper-wizard-api-types-and-schema";

function App() {
  const location = useLocation();
  const { auth, setAuth } = useAuthContext();
  const navigate = useNavigate();

  //on initial load, see if user is logged in using session_id cookie
  useEffect(() => {
    const fetchSession = async () => {
      try {
        // might be good to add a abort controller here
        const res = await fetch("/api/users/session", {
          credentials: "include",
        });
        if (res.ok) {
          const data = (await res.json()) as {
            isError: false;
            session: Session;
          };
          if (data && data.session) {
            setAuth(data.session);
          }
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setAuth(null);
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const isAuthPage =
      location.pathname === "/login" || location.pathname === "/register";
    const currentSession = auth;
    const hasSession = isValidSession(currentSession);

    if (!hasSession && !isAuthPage) {
      console.log("No user found, redirecting to login");
      navigate("/login");
    } else if (hasSession && isAuthPage) {
      console.log("User found, redirecting to home");
      navigate("/home");
    }

    return () => {};
  }, [location.pathname, auth]);

  return (
    <Container>
      <Outlet />
    </Container>
  );
}

const Container = styled("div", {
  border: "1px solid red",
  height: "100%",
  backgroundColor: "var(--gray-100)",
});

export default App;
