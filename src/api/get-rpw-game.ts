import { Game } from "@ssaquif/rock-paper-wizard-api-types-and-schema";

export async function getRPWGameByID(gameId: string): Promise<Game> {
  const res = await fetch(`/api/rpw_games/game/${gameId}`, {
    method: "GET",
  });

  const data = await res.json();
  return data;
}
