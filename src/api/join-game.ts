import {
  JoinGameForm,
  Game,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";

export async function joinGame(joinGameForm: JoinGameForm): Promise<Game> {
  const res = await fetch("/api/games/join-game", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(joinGameForm),
  });

  const data = await res.json();
  return data;
}
