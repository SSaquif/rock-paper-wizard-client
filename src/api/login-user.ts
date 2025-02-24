import {
  LoginForm,
  User,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";

// TODO: check register-user.ts for more info

type AuthenticatedUser = Omit<User, "password">;

export async function loginUser(
  loginForm: LoginForm
): Promise<AuthenticatedUser> {
  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginForm),
  });

  const data = await res.json();
  // console.log(data);
  const { user_id, created_at, updated_at } = data;
  return { user_id, created_at, updated_at };
}
