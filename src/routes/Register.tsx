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
import { useUser } from "../context/AuthContext";
import Form from "../components/Form";

export const registerAction: ActionFunction = async ({
  request,
}): Promise<AuthenticatedUser> => {
  console.log("Register Action");

  const formData = await request.formData();
  console.log("formData", formData);
  const submission = {
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    catcher: formData.get("catcher"),
  };
  console.log("submission", submission);

  if (submission.catcher) {
    return {
      isError: true,
      error: SYSTEM_ERRORS.HIDDEN_FIELD_NOT_EMPTY,
    };
  }

  const validatedData = UserRegistrationFormSchema.safeParse(submission);
  if (!validatedData.success) {
    console.log("Validation Error", validatedData.error.issues[0].message);
    return {
      isError: true,
      error: SYSTEM_ERRORS.ZOD_SCHEMA_VALIDATION_ERROR,
      message: validatedData.error.issues[0].message,
    };
  }

  // submit data
  const userRegistrationEntry: UserRegistrationEntry = {
    username: validatedData.data.username,
    password: validatedData.data.password,
    confirmPassword: validatedData.data.confirmPassword,
  };
  const data = await registerUser(userRegistrationEntry);

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

function Register() {
  const navigate = useNavigate();
  // @todo: Maybe not use null as the initial value
  const userContext = useUser();
  const location = useLocation();

  console.log("location", location);
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  console.log("isAuthPage", isAuthPage);
  console.log("test", !userContext?.user && !isAuthPage);

  //@todo: Error handling to be used with toast
  let actionData = useActionData() as AuthenticatedUser | undefined;

  function handleCancel() {
    navigate("/login");
  }

  // if user is already logged in, redirect to home
  useEffect(() => {
    // if (userContext?.user) {
    //   navigate("/home");
    // }
  }, [userContext]);

  useEffect(() => {
    //   //@todo: Add the relevant user data to the session or context
    //   //@todo: Add data to state
    // if (userContext) {
    //   userContext.setUser(actionData);
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
