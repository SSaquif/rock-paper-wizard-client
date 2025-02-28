import { useEffect } from "react";
// import globalStyles from "./GlobalStyles";
import { styled } from "./stitches-theme";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "./context/AuthContext";
function App() {
  const location = useLocation();
  const userContext = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("location", location);

    // Check if user is logged in
    if (!userContext?.user) {
      console.log("No user found, redirecting to login");
      navigate("/login");
    }
    // Is there a better way to handle this?
    else if (location.pathname === "/") {
      navigate("/home");
    }

    return () => {};
  }, [location, userContext?.user]);

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
