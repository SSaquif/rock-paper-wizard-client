import { Form } from "react-router-dom";
import { styled } from "../stitches-theme";
import BaseButton from "../components/Button";

function JoinGame() {
  return (
    <Container>
      <Form>
        <AvatarContainer>
          {/* todo: replace with proper selectable avatar component */}
          <div
            style={{
              height: "100px",
              width: "100px",
              borderRadius: "50%",
              backgroundColor: "var(--gray-300)",
            }}
          ></div>
        </AvatarContainer>
        <GameIDContainer>
          <label htmlFor="gameID">Game ID</label>
          <input type="text" id="gameID" />
        </GameIDContainer>
        <UserNameContainer>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </UserNameContainer>
        <ButtonContainer>
          <Button>Cancel</Button>
          <Button type="submit">Join Game</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

const Container = styled("div", {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const AvatarContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const UserNameContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "solid",
  "@tabletAndUp": {
    flexDirection: "row",
  },
});

const GameIDContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "solid",
  "@tabletAndUp": {
    flexDirection: "row",
  },
});

const ButtonContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
});

const Button = styled(BaseButton, {});

export default JoinGame;
