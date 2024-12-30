import {
  JoinGameForm,
  Game,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";

export async function joinRPWGame(joinGameForm: JoinGameForm): Promise<Game> {
  // conisder putting the first part in a constant ie api/rpw_games
  const res = await fetch("/api/rpw_games/join-game", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(joinGameForm),
  });

  const data = await res.json();
  return data;
}
