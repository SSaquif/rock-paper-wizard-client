import { styled } from "@stitches/react";
import BaseButton from "../components/Button";

function Login() {
  return (
    <Container>
      <h1>Login</h1>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <BaseButton type="submit">Login</BaseButton>
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
