import { AuthenticatedSession } from "@ssaquif/rock-paper-wizard-api-types-and-schema";
import { LoaderFunction, redirect } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const homeLoader: LoaderFunction = async ({
  request,
}): Promise<AuthenticatedSession> => {
  const res = await fetch("/api/users/session", {
    credentials: "include",
    signal: request.signal,
  });

  if (res.status === 401) {
    throw redirect("/login");
  }
  const data = (await res.json()) as AuthenticatedSession;

  // was having some zod issues
  // so commenting this out for now
  //   const parsed = AuthenticatedSessionSchema.safeParse(raw);
  //   if (!parsed.success) {
  //     console.error("Zod session validation failed:", parsed.error);
  //     throw redirect("/login");
  //   }
  //   const data = parsed.data;

  if (data.isError) {
    // @todo: handle error properly
    console.error("Error fetching session data:", data);
    throw redirect("/login");
  }

  console.log("Home Loader Data", data);
  return data;
};

export default homeLoader;
