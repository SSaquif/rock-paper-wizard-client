import { useEffect, useState } from "react";
import { socket } from "../../adapters/socket";
import { useParams } from "react-router-dom";

// TODO: make separate components for socket connection and disconnection as per socket io docs
// TODO: types for everything
function GameLobby() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const { game_id } = useParams();

  useEffect(() => {
    function onConnect() {
      socket.emit(
        "join-game",
        { game_id },
        (data: { error?: boolean; msg: string }) => {
          if (data.error) {
            console.log(data.msg);
            return;
          }
          setIsConnected(true);
        }
      );
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.connect();
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, [socket.connected]);

  return (
    <div>
      <h1>Game Lobby</h1>
      <p>${isConnected ? "Connected " : "Disconnected"}</p>
    </div>
  );
}

export default GameLobby;
