import {
  UserRegistrationEntry,
  AuthenticatedUser,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";

// @todo: Add to code for handling session
export async function registerUser(
  registrationEntry: UserRegistrationEntry
): Promise<AuthenticatedUser> {
  const res = await fetch("/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationEntry),
  });

  // @todo: see if there is a better way to determine type of response
  const data = (await res.json()) as AuthenticatedUser;
  console.log("registerUser data from server", data);
  return data;
}
