import { styled } from "@stitches/react";
import BaseButton from "../components/Button";
import {
  // Form,
  useNavigate,
  ActionFunction,
  useActionData,
  useLocation,
} from "react-router-dom";
import {
  AuthenticatedUser,
  SYSTEM_ERRORS,
  // consider renaming in api-types-and-schema or maybe Regitration Entry
  UserRegistrationEntry,
  UserRegistrationFormSchema,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";
import { registerUser } from "../api/register-user";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import Form from "../components/Form";

function Register() {
  const navigate = useNavigate();
  // @todo: Maybe not use null as the initial value
  const authContext = useAuthContext();
  const location = useLocation();

  console.log("location", location);
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  console.log("isAuthPage", isAuthPage);
  console.log("test", !authContext?.auth && !isAuthPage);

  //@todo: Error handling to be used with toast
  let actionData = useActionData() as AuthenticatedUser | undefined;

  function handleCancel() {
    navigate("/login");
  }

  // if user is already logged in, redirect to home
  useEffect(() => {
    // if (authContext?.user) {
    //   navigate("/home");
    // }
  }, [authContext]);

  useEffect(() => {
    //   //@todo: Add the relevant user data to the session or context
    //   //@todo: Add data to state
    // if (authContext) {
    //   authContext.setUser(actionData);
    // }
    // if (!actionData?.isError) {
    //   navigate("/home");
    // }
  }, [actionData]);

  return (
    <FormContainer>
      <Form method="POST" action="">
        <Form.Title>Register</Form.Title>
        <Form.DataRow type="real">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Input required type="string" id="username" name="username" />
        </Form.DataRow>
        <Form.DataRow type="real">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Input required type="password" name="password" id="password" />
        </Form.DataRow>
        <Form.DataRow type="real">
          <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
          <Form.Input
            required
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
        </Form.DataRow>
        <Form.DataRow type="fake">
          <Form.Label htmlFor="catcher">Fill this field</Form.Label>
          <Form.Input type="text" name="catcher" id="catcher" />
        </Form.DataRow>
        <ButtonContainer>
          <BaseButton type="submit">Register</BaseButton>
          <BaseButton onClick={handleCancel}>Cancel</BaseButton>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
}

const FormContainer = styled("div", {
  border: "1px solid white",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
});

// const RegistrationForm = styled(Form, {
//   border: "1px solid red",
//   display: "flex",
//   flexDirection: "column",
//   gap: "1rem",
//   justifyContent: "center",
//   alignItems: "center",
// });

const ButtonContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
});

export default Register;
