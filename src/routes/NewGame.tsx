import { Form, useNavigate } from "react-router-dom";
import { styled } from "../stitches-theme";
import BaseButton from "../components/Button";

function NewGame() {
  const navigate = useNavigate();

  function handleCancel() {
    navigate("/home");
  }

  return (
    <Container>
      <StyledForm>
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
        <FormDataRowContainer>
          <FormLabel htmlFor="username">Username</FormLabel>
          <FormInput type="text" id="username" />
        </FormDataRowContainer>
        <FormDataRowContainer>
          <FormLabel htmlFor="numOfPlayers">Players</FormLabel>
          {/* Write validation yourself */}
          <FormInput type="text" id="numOfPlayers" />
        </FormDataRowContainer>
        <ButtonContainer>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="submit">Create</Button>
        </ButtonContainer>
      </StyledForm>
    </Container>
  );
}

const Container = styled("div", {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--gray-900)",
});

const StyledForm = styled(Form, {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const AvatarContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const FormDataRowContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  minWidth: "fit-content",
  // border: "solid",
  "@tabletAndUp": {
    flexDirection: "row",
  },
});

const FormLabel = styled("label", {
  flexBasis: "30%",
  fontSize: "1.5rem",
  fontWeight: "900",
  // minWidth: "max-content",
});

const FormInput = styled("input", {
  flexBasis: "50%",
  fontSize: "1.5rem",
  fontWeight: "900",
});

const ButtonContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
});

// todo: maybe not needed just use BaseButton?
const Button = styled(BaseButton, {});

export default NewGame;
