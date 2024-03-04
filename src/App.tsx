import { useEffect } from "react";
// import globalStyles from "./GlobalStyles";
import { styled } from "./stitches-theme";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
function App() {
  // globalStyles();

  // testing
  // useEffect(() => {
  //   const users = fetch("/api/users")
  //     .then((response) => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  const location = useLocation();
  const navigate = useNavigate();

  // think there is a better way to do this
  useEffect(() => {
    // console.log("location", location);
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [location]);

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
