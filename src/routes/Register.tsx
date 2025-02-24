import { styled } from "@stitches/react";
import BaseButton from "../components/Button";
import {
  Form,
  useNavigate,
  ActionFunction,
  useActionData,
  redirect,
} from "react-router-dom";
import {
  RegistrationForm,
  RegistrationFormSchema,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";
import { registerUser } from "../api/register-user";
import { EntryError } from "../types/errors";

export const registerAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const submission = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  // field validations
  const validatedData = RegistrationFormSchema.safeParse(submission);
  if (!validatedData.success) {
    return {
      isError: true,
      message: validatedData.error.issues[0].message,
    };
  }

  // submit data
  const registrationEntry: RegistrationForm = {
    username: validatedData.data.username,
    password: validatedData.data.password,
    confirmPassword: validatedData.data.confirmPassword,
  };
  const data = await registerUser(registrationEntry);

  // TODO: see the comments on cache invalidation in NewGame.tsx
  if (!data) {
    return {
      isError: true,
      message: "Registration failed",
    };
  }
  //TODO: Add the relevant user data to the session or context

  // TODO: might have to update this redi
  return redirect("/home");
};

function Register() {
  const navigate = useNavigate();
  // TODO: Error handling to be used with toast
  let error = useActionData() as EntryError | undefined;
  console.log("useActionError, Register", error);
  if (!error) {
    error = { isError: false, message: null };
  }

  function handleCancel() {
    navigate("/home");
  }

  return (
    <FormContainer>
      <StyledForm method="POST" action="">
        <h1>Register</h1>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" name="confirm-password" id="confirm-password" />
        <ButtonContainer>
          <BaseButton type="submit">Register</BaseButton>
          <BaseButton onClick={handleCancel}>Cancel</BaseButton>
        </ButtonContainer>
      </StyledForm>
    </FormContainer>
  );
}

const FormContainer = styled("form", {
  border: "1px solid white",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "white",
});

const StyledForm = styled(Form, {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
});

const ButtonContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
});

export default Register;
