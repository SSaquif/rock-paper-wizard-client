import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { styled } from "../stitches-theme";
import BaseButton from "../components/Button";
import {
  JoinGameForm,
  JoinGameFormSchema,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";
import { joinRPWGame } from "../api/join-rpw-game";
import { EntryError } from "../types/errors";

export const joinGameAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const submission = {
    gameId: formData.get("gameId") as string,
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    selectedColor: formData.get("selectedColor") as string,
  };

  // field validations
  // if (submission.botcatcher) {
  //   return {
  //     isError: true,
  //     message: "OOps! Something went wrong",
  //   };
  // }
  const validatedData = JoinGameFormSchema.safeParse(submission);
  if (!validatedData.success) {
    return {
      isError: true,
      message: validatedData.error.issues[0].message,
    };
  }

  // submit data
  const joinGameEntry: JoinGameForm = {
    gameId: validatedData.data.gameId,
    username: validatedData.data.username,
    password: validatedData.data.password,
    selectedColor: validatedData.data.selectedColor,
  };

  const data = await joinRPWGame(joinGameEntry);
  // todo: invalidate cache
  // await queryClient.invalidateQueries(["games"]);
  // todo: use better error handling using values from above hook
  if (!data) {
    return {
      isError: true,
      message: "Something went wrong",
    };
  }
  //fix: This seems to be undefined
  const { game_id } = data;
  return redirect(`/game/${game_id}/lobby`);
};

function JoinGame() {
  const navigate = useNavigate();
  let error = useActionData() as undefined | EntryError;
  if (!error) {
    error = { isError: false, message: null };
  }

  function handleCancel() {
    navigate("/home");
  }

  return (
    <Container>
      <StyledForm method="PATCH" action="">
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
          <FormLabel htmlFor="gameID">Game ID</FormLabel>
          <FormInput required type="text" id="gameID" name="gameId" />
        </FormDataRowContainer>
        <FormDataRowContainer>
          <FormLabel htmlFor="username">Username</FormLabel>
          <FormInput required type="text" id="username" name="username" />
        </FormDataRowContainer>
        <FormDataRowContainer>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput required type="password" id="password" name="password" />
        </FormDataRowContainer>
        <FormDataRowContainer>
          <FormLabel htmlFor="selectedColor">Color</FormLabel>
          <FormInput
            required
            type="text"
            id="selectedColor"
            name="selectedColor"
          />
        </FormDataRowContainer>
        {/* todo: add a bot catcher */}
        <ButtonContainer>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="submit">Join</Button>
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
  // border: "solid",
  "@tabletAndUp": {
    flexDirection: "row",
  },
});

const FormLabel = styled("label", {
  flexBasis: "40%",
  fontSize: "1.5rem",
  fontWeight: "900",
});

const FormInput = styled("input", {
  flexBasis: "40%",
  fontSize: "1.5rem",
  fontWeight: "900",
  flexGrow: 0,
});

const ButtonContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
});

// todo: maybe not needed just use BaseButton?
const Button = styled(BaseButton, {});

export default JoinGame;
