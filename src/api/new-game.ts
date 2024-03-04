// import { useQuery } from "@tanstack/react-query";

export type NewGameEntry = {
  username: string;
  numOfPlayers: number;
  password: string;
  confirmPassword: string;
};

export async function createNewGame(submission: NewGameEntry): Promise<any> {
  const res = await fetch("/api/new-game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submission),
  });
  return res.json();
}

// todo: fix type error later and use react-query
// export default function useCreateNewGame() {
//   return useQuery({
//     queryKey: ["createNewGame", ],
//     queryFn: ()=> createNewGame(),
//   });
// }
