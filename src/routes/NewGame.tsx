import { Form, useNavigate } from "react-router-dom";
import * as Toast from "@radix-ui/react-toast";
import { styled } from "../stitches-theme";
import BaseButton from "../components/Button";
import { useState } from "react";

type NewGameEntry = {
  username: string;
  numOfPlayers: number;
};

type EntryError = {
  isError: boolean;
  message: string | null;
};

function NewGame() {
  const navigate = useNavigate();
  const [newGameEntry, setNewGameEntry] = useState<NewGameEntry>({
    username: "",
    numOfPlayers: 2,
  });
  const [error, setError] = useState<EntryError>({
    isError: false,
    message: null,
  });

  function validateUserData() {
    // todo add regex validation for username, to only contain letters and numbers

    if (
      newGameEntry?.username.length < 3 ||
      newGameEntry?.username.length > 20
    ) {
      setError({
        isError: true,
        message: "Username must be between 3-20 characters",
      });
      return false;
    }
    if (newGameEntry?.username.match(/[^a-zA-Z0-9]/)) {
      setError({
        isError: true,
        message: "Username must contain only letters and numbers",
      });
      return false;
    }
    if (newGameEntry?.numOfPlayers < 2 || newGameEntry?.numOfPlayers > 6) {
      setError({
        isError: true,
        message: "Number of players must be between 2-6",
      });
      return false;
    }
  }

  function handleCreateGame() {
    console.log("newGameEntry", newGameEntry);
    if (!validateUserData()) {
      return;
    }
  }

  function handleCancel() {
    navigate("/home");
  }

  return (
    <Container>
      <Toast.Provider swipeDirection="right">
        <StyledForm onSubmit={handleCreateGame}>
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
            <FormInput
              type="text"
              id="username"
              value={newGameEntry.username}
              onChange={(ev) => {
                setNewGameEntry((prev) => ({
                  ...prev,
                  username: ev.target.value,
                }));
              }}
            />
          </FormDataRowContainer>
          <FormDataRowContainer>
            <FormLabel htmlFor="numOfPlayers">Players</FormLabel>
            {/* Write validation yourself */}
            <FormInput
              type="text"
              id="numOfPlayers"
              value={newGameEntry.numOfPlayers}
              onChange={(ev) => {
                setNewGameEntry((prev) => ({
                  ...prev,
                  numOfPlayers: parseInt(ev.target.value),
                }));
              }}
            />
          </FormDataRowContainer>
          <ButtonContainer>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="submit">Create</Button>
          </ButtonContainer>
        </StyledForm>
        {/* // Make a separate reusable toast component */}
        <Toast.Root open={error.isError}>
          <Toast.Title>{error.message}</Toast.Title>
          <Toast.Close
            onClick={() => {
              setError({
                isError: false,
                message: null,
              });
            }}
          >
            Close
          </Toast.Close>
        </Toast.Root>
        <ToastViewport />
      </Toast.Provider>
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

const ToastViewport = styled(Toast.Viewport, {
  position: "fixed",
  bottom: 0,
  left: "50%",
  transform: `translate(-50%, -50%)`,
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "solid var(--gray-300)",
});
// todo: maybe not needed just use BaseButton?
const Button = styled(BaseButton, {});

export default NewGame;
