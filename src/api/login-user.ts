import {
  LoginEntry,
  AuthenticatedUser,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";

// TODO: check register-user.ts for more info

export async function loginUser(
  loginEntry: LoginEntry
): Promise<AuthenticatedUser> {
  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginEntry),
  });

  const data = await res.json();
  console.log("loginUser data from server", data);
  if (data.error) {
    return {
      error: data.error,
      isError: true,
      message: data.error,
    };
  }

  const { user_id, created_at, updated_at } = data;
  return {
    user_id,
    created_at,
    updated_at,
    isError: false,
  };
}
