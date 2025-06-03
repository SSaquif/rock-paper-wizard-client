// apparently don't need with remix anymore
// import { useMutation } from "@tanstack/react-query";
import {
  NewRPWGameForm,
  RPWGame,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";

export async function createNewRPWGame(
  newGameForm: NewRPWGameForm
): Promise<RPWGame> {
  const res = await fetch("/api/rpw_games/new-game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGameForm),
  });

  const data = await res.json();
  // console.log(data);
  return data;
}

// todo: fix type error later and use react-query
// probably don't need cache for this with mutationKey
// Apparently don't need to use react-query for this
// since action take care of this
// export default function useCreateNewGame(newGameEntry: NewGameEntry) {
//   return useMutation({
//     mutationFn: createNewGame,
//   });
// }
