import { useRouteError } from "react-router-dom";
import { styled } from "../stitches-theme";

function Notfound() {
  // todo: fix typing
  const error: any = useRouteError();
  console.log("error", error);

  return (
    <Container>
      <p>
        <i>{`${error.status} ${error.statusText}`}</i>
      </p>
    </Container>
  );
}

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  border: "1px solid red",
});

export default Notfound;
