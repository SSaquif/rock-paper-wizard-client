import { styled } from "../../stitches-theme";
import BaseButton from "../../components/Button";
import { useNavigate } from "react-router-dom";

function RPWHome() {
  const navigate = useNavigate();
  function handleNewGame() {
    navigate("/new-game");
  }
  function handleJoinGame() {
    navigate("/join-game");
  }
  return (
    <Container>
      <Button onClick={handleNewGame}>New Game</Button>
      <Button onClick={handleJoinGame}>Join Game</Button>
    </Container>
  );
}

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});

const Button = styled(BaseButton, {
  // border: "1px solid red",
});

export default RPWHome;
