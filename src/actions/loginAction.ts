import { ActionFunction, redirect } from "react-router-dom";
import {
  AuthenticatedUser,
  LoginFormSchema,
  SYSTEM_ERRORS,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";
import { loginUser } from "../api/login-user";

const loginAction: ActionFunction = async ({
  request,
}): Promise<AuthenticatedUser | Response> => {
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
  // return data;
  return redirect("/home");
};

export default loginAction;
