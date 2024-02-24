import { styled } from "../stitches-theme";
import BaseButton from "../components/Button";

function Home() {
  return (
    <Container>
      <Button>New Game</Button>
      <Button>Join Game</Button>
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

export default Home;
