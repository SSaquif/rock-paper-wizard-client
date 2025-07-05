import { useEffect } from "react";
// import globalStyles from "./GlobalStyles";
import { styled } from "./stitches-theme";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { isValidSession, useAuthContext } from "./context/AuthContext";

function App() {
  const location = useLocation();
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("location", location);

    const isAuthPage =
      location.pathname === "/login" || location.pathname === "/register";

    const currentSession = auth;
    const hasSession = isValidSession(currentSession);
    console.log("auth in App", auth);
    console.log("hasSession", hasSession);
    /**
     * If not logged in and not on an auth page, redirect to login
     */
    // if (!AuthContext?.auth?.user_id && !isAuthPage) {
    if (!hasSession && !isAuthPage) {
      console.log("No user found, redirecting to login");
      navigate("/login");
    }
    // else if (location.pathname === "/") {
    //   navigate("/home");
    // }

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
