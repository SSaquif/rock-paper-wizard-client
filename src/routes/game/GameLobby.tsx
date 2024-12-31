import { useEffect, useState } from "react";
import { gameSocket } from "../../adapters/socket";
import { useParams } from "react-router-dom";
import { styled } from "@stitches/react";
import { useQuery } from "@tanstack/react-query";
import { getRPWGameByID } from "../../api/get-rpw-game";
import BaseButton from "../../components/Button";
import CSS from "csstype";
// TODO: make separate components for socket connection and disconnection as per socket io docs
// TODO: types for everything
function GameLobby() {
  const [isConnected, setIsConnected] = useState(gameSocket.connected);
  const { game_id } = useParams();
  const [players, setPlayers] = useState<(string | null)[]>([]);

  if (!game_id) {
    return <p>Game ID not</p>;
  }

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["rpwGameFromID", game_id],
    queryFn: () => getRPWGameByID(game_id),
  });

  console.log("data", data);

  //
  useEffect(() => {
    if (data) {
      const players = new Array();
      for (let i = 0; i < data.number_of_players; i++) {
        const playerKey = `player_${i + 1}` as keyof typeof data;
        if (data[playerKey]) {
          players[i] = data[playerKey];
        }
      }
      setPlayers(players);
    }
  }, [data]);

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
      <HeaderContainer>
        <h1>Lobby</h1>
        <h2> Rock Paper Wizard</h2>
        <p>${isConnected ? "Connected " : "Disconnected"}</p>
      </HeaderContainer>
      <PlayerContainer>
        {data &&
          players.map((p, i) => {
            const colorKey = `player_${i + 1}_color` as keyof typeof data;
            const playerColor = data[colorKey] as CSS.Property.BackgroundColor;
            return (
              <PlayerDetails key={`player_${i + 1}`}>
                <Avatar css={{ backgroundColor: playerColor }}></Avatar>
                <p>{p}</p>
              </PlayerDetails>
            );
          })}
      </PlayerContainer>
      <DetailsContainer>
        <p>Number of Players: {data?.number_of_players}</p>
        <p>Game ID: {game_id}</p>
        <p>Players in Room: {players.length}</p>
      </DetailsContainer>
      <ButtonContainer>
        <StartGameButton>Start</StartGameButton>
        <CancelGameButton>Cancel</CancelGameButton>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled("div", {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "white", // put this in theme
  border: "1px solid white",
});

const HeaderContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "1rem",
  border: "1px solid white",
});

const PlayerContainer = styled("ul", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  border: "1px solid white",
  padding: "0",
});

const PlayerDetails = styled("li", {
  listStyle: "none",
});

const Avatar = styled("div", {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  border: "1px solid white",
  backgroundColor: "white",
});

const DetailsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ButtonContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  border: "1px solid white",
});

const StartGameButton = styled(BaseButton, {});

const CancelGameButton = styled(BaseButton, {});

export default GameLobby;
