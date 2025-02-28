import {
  useNavigate,
  ActionFunction,
  useActionData,
  redirect,
  Link,
} from "react-router-dom";
import * as Toast from "@radix-ui/react-toast";
import { styled } from "../stitches-theme";
import { EntryError } from "../types/errors";
import BaseButton from "../components/Button";
import Form from "../components/Form";

export const loginAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const submission = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    botcatcher: formData.get("botcatcher") as string,
  };

  // field validations
  if (submission.botcatcher) {
    return {
      isError: true,
      message: "OOps! Something went wrong",
    };
  }
};

function Login() {
  return (
    <Container>
      <Toast.Provider swipeDirection="right">
        <StyledForm method="POST" action="">
          <Form.Title>Login</Form.Title>
          <Form.DataRow type="real">
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Input type="text" name="username" id="username" />
          </Form.DataRow>
          <Form.DataRow type="real">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Input type="password" name="password" id="password" />
          </Form.DataRow>
          <BaseButton type="submit">Login</BaseButton>
          <Link to="/register">Don't have an account? Register Here!</Link>
        </StyledForm>
        <Toast.Root>
          <Toast.Title>{}</Toast.Title>
          <Toast.Close onClick={() => {}}> Close </Toast.Close>
        </Toast.Root>
        <ToastViewPort />
      </Toast.Provider>
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

const StyledForm = styled(Form, {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  border: "dotted 2px white",
});

// see NewRPWGame.tsx, make it into a reusable component
const ToastViewPort = styled(Toast.Viewport, {
  position: "fixed",
  bottom: 0,
});

export default Login;
