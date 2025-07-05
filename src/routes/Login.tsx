import { Link, redirect } from "react-router-dom";
// import * as Toast from "@radix-ui/react-toast";
import { styled } from "../stitches-theme";
// import { EntryError } from "../types/errors";
import BaseButton from "../components/Button";
import Form from "../components/Form";
import { useEffect } from "react";
import { isValidSession, useAuthContext } from "../context/AuthContext";

function Login() {
  const { auth } = useAuthContext();

  useEffect(() => {
    if (auth && isValidSession(auth)) {
      redirect("/home");
    }
  }, [auth]);

  return (
    <Container>
      {/* <Toast.Provider swipeDirection="right"> */}
      <LoginForm method="POST" action="">
        <Form.Title>Login</Form.Title>
        <Form.DataRow type="real">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Input type="text" name="username" id="username" />
        </Form.DataRow>
        <Form.DataRow type="real">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Input type="password" name="password" id="password" />
        </Form.DataRow>
        <Form.DataRow type="fake">
          <Form.Label htmlFor="catcher">Fill this field</Form.Label>
          <Form.Input type="text" name="catcher" id="catcher" />
        </Form.DataRow>
        <BaseButton type="submit">Login</BaseButton>
        <Link to="/register">Don't have an account? Register Here!</Link>
      </LoginForm>
      {/* <Toast.Root> */}
      {/* <Toast.Title>{}</Toast.Title> */}
      {/* <Toast.Close onClick={() => {}}> Close </Toast.Close> */}
      {/* </Toast.Root> */}
      {/* <ToastViewPort /> */}
      {/* </Toast.Provider> */}
    </Container>
  );
}

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  color: "white",
});

const LoginForm = styled(Form, {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  border: "dotted 2px white",
  justifyContent: "center",
  alignItems: "center",
});

// see NewRPWGame.tsx, make it into a reusable component
// const ToastViewPort = styled(Toast.Viewport, {
//   position: "fixed",
//   bottom: 0,
// });

export default Login;
