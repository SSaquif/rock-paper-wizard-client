import { useEffect, useState } from "react";
import { gameSocket } from "../../adapters/socket";
import { useParams } from "react-router-dom";

// TODO: make separate components for socket connection and disconnection as per socket io docs
// TODO: types for everything
function GameLobby() {
  const [isConnected, setIsConnected] = useState(gameSocket.connected);
  const { game_id } = useParams();

  useEffect(() => {
    async function joinLobbyAck() {
      const serverResponse: any = await gameSocket.emit("join-game", {
        game_id,
        username: "test",
      });
      console.log("serverResponse", serverResponse);
      if (serverResponse.error) {
        console.log(serverResponse.msg);
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
    <div>
      <h1>Game Lobby</h1>
      <p>${isConnected ? "Connected " : "Disconnected"}</p>
    </div>
  );
}

export default GameLobby;
