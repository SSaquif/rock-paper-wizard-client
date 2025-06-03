import {
  // useNavigate,
  ActionFunction,
  // useActionData,
  // redirect,
  Link,
} from "react-router-dom";
// import * as Toast from "@radix-ui/react-toast";
import { styled } from "../stitches-theme";
// import { EntryError } from "../types/errors";
import BaseButton from "../components/Button";
import Form from "../components/Form";
import {
  AuthenticatedUser,
  LoginFormSchema,
  SYSTEM_ERRORS,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";
import { loginUser } from "../api/login-user";

export const loginAction: ActionFunction = async ({
  request,
}): Promise<AuthenticatedUser> => {
  const formData = await request.formData();
  const submission = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    catcher: formData.get("catcher") as string,
  };
  console.log("Login submission", submission);

  // field validations
  if (submission.catcher) {
    return {
      isError: true,
      error: SYSTEM_ERRORS.HIDDEN_FIELD_NOT_EMPTY,
    };
  }
  const validatedData = LoginFormSchema.safeParse(submission);
  if (!validatedData.success) {
    return {
      isError: true,
      error: SYSTEM_ERRORS.ZOD_SCHEMA_VALIDATION_ERROR,
      message: validatedData.error.issues[0].message,
    };
  }

  // submit data
  const loginData = {
    username: validatedData.data.username,
    password: validatedData.data.password,
  };
  console.log("Login data", loginData);
  const data = await loginUser(loginData);

  //@todo: see the comments on cache invalidation in NewGame.tsx
  if (!data) {
    return {
      isError: true,
      error: SYSTEM_ERRORS.GENERIC_ERROR,
    };
  }
  //@todo: update endpoint to handle server errors
  return data;
};

function Login() {
  // const navigate = useNavigate();

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
