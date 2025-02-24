import {
  RegistrationForm,
  User,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";

// TODO: instead of returning User, return a type that includes the token
// for now return everything but password but later
// look into using sessions or tokens etc

type AuthenticatedUser = Omit<User, "password">;
export async function registerUser(
  registrationForm: RegistrationForm
): Promise<AuthenticatedUser> {
  const res = await fetch("/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationForm),
  });

  // TODO: fix "any" type
  const data = await res.json();
  // console.log(data);
  const { user_id, created_at, updated_at } = data;
  return { user_id, created_at, updated_at };
}
