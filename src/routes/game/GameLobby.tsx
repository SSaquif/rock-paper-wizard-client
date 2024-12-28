import { useEffect, useState } from "react";
import { gameSocket } from "../../adapters/socket";
import { useParams } from "react-router-dom";
import { styled } from "@stitches/react";
import { useQuery } from "@tanstack/react-query";

// TODO: make separate components for socket connection and disconnection as per socket io docs
// TODO: types for everything
function GameLobby() {
  const [isConnected, setIsConnected] = useState(gameSocket.connected);
  const { game_id } = useParams();

  useEffect(() => {
    async function joinLobbyAck() {
      // should store this response in some global state
      // also find the correct typing for this
      // this typing returns any
      const serverResponse: Awaited<ReturnType<typeof gameSocket.emitWithAck>> =
        // const serverResponse: any =
        await gameSocket.emit("join-game", {
          game_id,
          username: "test",
        });
      console.log("serverResponse", serverResponse);
      if (!serverResponse.connected) {
        setIsConnected(false);
        return;
      }
      setIsConnected(true);
    }

    function onConnect() {
      console.log("trying to connect to game room");
      joinLobbyAck();
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    // Maybe try with auto connect
    gameSocket.connect();
    gameSocket.on("connect", onConnect);
    gameSocket.on("disconnect", onDisconnect);

    return () => {
      gameSocket.disconnect();
      gameSocket.off("connect", onConnect);
      gameSocket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <Container>
      <h1>Game Lobby</h1>
      <p>${isConnected ? "Connected " : "Disconnected"}</p>
    </Container>
  );
}

const Container = styled("div", {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "white", // put this in theme
});

export default GameLobby;
