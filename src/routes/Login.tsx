import { styled } from "@stitches/react";
import BaseButton from "../components/Button";
import { Link } from "react-router-dom";

function Login() {
  return (
    <Container>
      <h1>Login</h1>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <BaseButton type="submit">Login</BaseButton>
      <Link to="/register">Don't have an account? Register Here!</Link>
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

export default Login;
