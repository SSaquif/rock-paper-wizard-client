import {
  Form,
  useNavigate,
  ActionFunction,
  useActionData,
} from "react-router-dom";
import * as Toast from "@radix-ui/react-toast";
import { styled } from "../stitches-theme";
import BaseButton from "../components/Button";
import { useState } from "react";
import PLayerSelect from "../components/PlayerSelect";

type NewGameEntry = {
  username: string;
  numOfPlayers: number;
  password: string;
};

type EntryError = {
  isError: boolean;
  message: string | null;
};

export const newGameAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const submission = {
    username: formData.get("username") as string,
    numOfPlayers: Number(formData.get("numOfPlayers")),
    password: formData.get("password") as string,
    botcatcher: formData.get("botcatcher") as string,
  };
  const { username, numOfPlayers } = submission;
  let error: EntryError = {
    isError: false,
    message: null,
  };

  if (submission.botcatcher) {
    return {
      isError: true,
      message: "OOps! Something went wrong",
    };
  }

  // Todo: currently commented out because
  // using default HTML Form validation https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
  // but might put them back to provide better custom error toast messages
  // built in validation might be not good enough for mobile
  if (username.length < 3 || username.length > 20) {
    error = {
      isError: true,
      message: "Username must be between 3-20 characters",
    };
  } else if (username.match(/[^a-zA-Z0-9]/)) {
    error = {
      isError: true,
      message: "Username must contain only letters and numbers",
    };
  }
  // if numberofPLayers is NaN
  else if (!Number(numOfPlayers)) {
    error = {
      isError: true,
      message: "Number of players must be a number",
    };
  } else if (numOfPlayers < 2 || numOfPlayers > 6) {
    error = {
      isError: true,
      message: "Number of players must be between 2-6",
    };
  }

  if (error.isError) {
    return error;
  }
  console.log("submission", submission);
  // const {gameId} = await createNewGame(submission);
  // return redirect("/game/:game-id/lobby");
  return {};
};

function NewGame() {
  const navigate = useNavigate();
  let error = useActionData() as undefined | EntryError;
  console.log("error", error);
  if (!error) {
    error = {
      isError: false,
      message: null,
    };
  }

  function handleCancel() {
    navigate("/home");
  }

  return (
    <Container>
      <Toast.Provider swipeDirection="right">
        <StyledForm method="POST" action="">
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
          <FormDataRowContainer type={"real"}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <FormInput
              required
              type="string"
              id="username"
              name="username"
              // commented out because using cutome error msg with toast
              // minLength={3}
              // maxLength={20}
              // pattern="[a-zA-Z0-9]+" // only letters and numbers
            />
          </FormDataRowContainer>
          <FormDataRowContainer type={"real"}>
            <FormLabel htmlFor="numOfPlayers">Players</FormLabel>
            {/* Write validation yourself */}
            <FormInput
              required
              type="number"
              id="numOfPlayers"
              name="numOfPlayers"
              // commented out causes srews up css in chrome
              // min={2}
              // max={6}
            />
            {/* <PLayerSelect /> */}
          </FormDataRowContainer>
          <FormDataRowContainer type={"real"}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput required type="text" id="paswword" name="paswword" />
          </FormDataRowContainer>
          <FormDataRowContainer type={"fake"}>
            <FormLabel htmlFor="botcatcher">Bot Honeypot</FormLabel>
            <FormInput required type="text" id="botcatcher" name="botcatcher" />
          </FormDataRowContainer>
          <ButtonContainer>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="submit">Create</Button>
          </ButtonContainer>
        </StyledForm>
        {/* // Make a separate reusable toast component */}
        <Toast.Root open={error?.isError}>
          <Toast.Title>{error?.message}</Toast.Title>
          <Toast.Close onClick={() => {}}>Close</Toast.Close>
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
  variants: {
    type: {
      real: {
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
      },
      fake: {
        opacity: 0,
        position: "absolute",
        top: 0,
        left: 0,
        height: 0,
        width: 0,
        zIndex: -1,
      },
    },
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
