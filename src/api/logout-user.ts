import {
  APIErrorResponse,
  APISuccessResponse,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";

export async function logoutUser(): Promise<any> {
  const res = await fetch("/api/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = (await res.json()) as APIErrorResponse | APISuccessResponse;

  console.log("logoutUser data from server", data);
  if (data.isError) {
    return {
      isError: true,
      error: data.error,
      message: data.message,
      details: data.details,
    };
  }
  return {
    isError: false,
    message: data.message,
    details: data.details,
  };
}
