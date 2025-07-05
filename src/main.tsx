import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.tsx";
// import RPWHome from "./routes/rpw-game/RPWHome.tsx";
import NewRPWGame, { newRPWGameAction } from "./routes/rpw-game/NewRPWGame.tsx";
import JoinGame, { joinGameAction } from "./routes/JoinGame.tsx";
import GameLobby from "./routes/rpw-game/RPWGameLobby.tsx";
import GameRoom from "./routes/rpw-game/RPWGameRoom.tsx";
import Notfound from "./routes/NotFound.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./routes/Login.tsx";
import loginAction from "./actions/loginAction.ts";
import Register from "./routes/Register.tsx";
import registerAction from "./actions/registerAction.ts";
import { AuthProvider } from "./context/AuthContext.tsx";
import homeLoader from "./loaders/homeLoader.ts";

export const queryClient = new QueryClient();

// Alternate way: https://reactrouter.com/en/main/utils/create-routes-from-elements
// ^ Above might be more helpful for using context
// A possible way to use context: https://codesandbox.io/p/sandbox/react-context-with-react-router-v6-m72xf?file=%2Fsrc%2Findex.js%3A9%2C12
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Notfound />,
    children: [
      {
        path: "home",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "new-game",
        element: <NewRPWGame />,
        action: newRPWGameAction,
      },
      {
        path: "join-game",
        element: <JoinGame />,
        action: joinGameAction,
      },
      // Might be a good idea to nest the 2 routes below
      // That way will be easier to wrap with contexts
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
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
