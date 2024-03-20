import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.tsx";
import NewGame, { newGameAction } from "./routes/NewGame.tsx";
import JoinGame, { joinGameAction } from "./routes/JoinGame.tsx";
import GameLobby from "./routes/game/GameLobby.tsx";
import GameRoom from "./routes/game/GameRoom.tsx";
import Notfound from "./routes/NotFound.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Notfound />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "new-game",
        element: <NewGame />,
        action: newGameAction,
      },
      {
        path: "join-game",
        element: <JoinGame />,
        action: joinGameAction,
      },
      {
        path: "game/:game_id/lobby",
        element: <GameLobby />,
      },
      {
        path: "game/:game_id/play",
        element: <GameRoom />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
