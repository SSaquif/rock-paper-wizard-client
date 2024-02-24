import { Form } from "react-router-dom";
import { styled } from "../stitches-theme";
import BaseButton from "../components/Button";

function NewGame() {
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
        <UserNameContainer>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </UserNameContainer>
        <NumOfPlayersContainer>
          <label htmlFor="numOfPlayers">Number of Players</label>
          <input type="number" id="numOfPlayers" min={2} max={6} />
        </NumOfPlayersContainer>
        <ButtonContainer>
          <Button>Cancel</Button>
          <Button type="submit">Create Game</Button>
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

const NumOfPlayersContainer = styled("div", {
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

export default NewGame;
