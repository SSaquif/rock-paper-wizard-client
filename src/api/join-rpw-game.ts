import {
  JoinRPWGameForm,
  RPWGame,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";

export async function joinRPWGame(
  joinRPWGameForm: JoinRPWGameForm
): Promise<RPWGame> {
  // conisder putting the first part in a constant ie api/rpw_games
  const res = await fetch("/api/rpw_games/join-game", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(joinRPWGameForm),
  });

  const data = await res.json();
  return data;
}
