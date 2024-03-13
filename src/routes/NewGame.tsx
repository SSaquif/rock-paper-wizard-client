import {
  Form,
  useNavigate,
  ActionFunction,
  useActionData,
  redirect,
} from "react-router-dom";
import * as Toast from "@radix-ui/react-toast";
import { styled } from "../stitches-theme";
import BaseButton from "../components/Button";
// import { useState } from "react";
// import PLayerSelect from "../components/PlayerSelect";
import { createNewGame } from "../api/new-game";
// import { queryClient } from "../main";
import {
  NewGameEntry,
  NewGameEntrySchema,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";

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
    confirmPassword: formData.get("confirmPassword") as string,
    botcatcher: formData.get("botcatcher") as string,
  };

  // field validations
  if (submission.botcatcher) {
    return {
      isError: true,
      message: "OOps! Something went wrong",
    };
  }
  const validatedData = NewGameEntrySchema.safeParse(submission);
  if (!validatedData.success) {
    return {
      isError: true,
      message: validatedData.error.issues[0].message,
    };
  }

  // submit data
  const newGameEntry: NewGameEntry = {
    username: validatedData.data.username,
    numOfPlayers: validatedData.data.numOfPlayers,
    password: validatedData.data.password,
    confirmPassword: validatedData.data.confirmPassword,
  };
  const data = await createNewGame(newGameEntry);

  // todo: invalidate cache
  // await queryClient.invalidateQueries(["games"]);
  // todo: use better error handling using values from above hook
  if (!data) {
    return {
      isError: true,
      message: "Something went wrong",
    };
  }
  //
  const { gameID } = data;
  // return redirect(`/game/${gameID}/lobby`);
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
            <FormInput required type="text" id="password" name="password" />
          </FormDataRowContainer>
          <FormDataRowContainer type={"fake"}>
            <FormLabel htmlFor="botcatcher">Bot Honeypot</FormLabel>
            <FormInput type="text" id="botcatcher" name="botcatcher" />
          </FormDataRowContainer>
          <FormDataRowContainer type={"real"}>
            <FormLabel htmlFor="confirmPassword">Password</FormLabel>
            <FormInput
              required
              type="text"
              id="confirmPassword"
              name="confirmPassword"
            />
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
