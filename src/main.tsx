import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.tsx";
import NewGame from "./routes/NewGame.tsx";
import JoinGame from "./routes/JoinGame.tsx";
import GameLobby from "./routes/game/GameLobby.tsx";
import GameRoom from "./routes/game/GameRoom.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "new-game",
        element: <NewGame />,
      },
      {
        path: "join-game",
        element: <JoinGame />,
      },
      {
        path: "game/:game-id/lobby",
        element: <GameLobby />,
      },
      {
        path: "game/:game-id/play",
        element: <GameRoom />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
