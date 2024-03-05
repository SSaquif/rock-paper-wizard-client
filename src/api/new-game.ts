import { useMutation } from "@tanstack/react-query";

export type NewGameEntry = {
  username: string;
  numOfPlayers: number;
  password: string;
  confirmPassword: string;
};

export type Game = {
  gameID: string;
};

export async function createNewGame(newGameEntry: NewGameEntry): Promise<Game> {
  const res = await fetch("/api/new-game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGameEntry),
  });

  const data = await res.json();
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
