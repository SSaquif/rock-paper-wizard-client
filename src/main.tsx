import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <div>About</div>,
      },
      {
        path: "new-game",
        element: <div>New Game</div>,
      },
      {
        path: "join-game",
        element: <div>Join Game</div>,
      },
      {
        path: ":game-id/lobby",
        element: <div>Game</div>,
      },
      {
        path: ":game-id/play",
        element: <div>Play</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
