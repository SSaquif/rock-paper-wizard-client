import { ActionFunction, redirect } from "react-router-dom";
import {
  AuthenticatedUser,
  SYSTEM_ERRORS,
  UserRegistrationEntry,
  UserRegistrationFormSchema,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";
import { registerUser } from "../api/register-user";

const registerAction: ActionFunction = async ({
  request,
}): Promise<AuthenticatedUser | Response> => {
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
  return redirect("/home");
};

export default registerAction;
