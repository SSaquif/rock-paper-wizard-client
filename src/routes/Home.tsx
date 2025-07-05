import { Session } from "@ssaquif/rock-paper-wizard-api-types-and-schema";
import { styled } from "@stitches/react";
import { useLoaderData } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

function Home() {
  const data = useLoaderData() as { isError: false; session: Session };
  const { setAuth } = useAuthContext();

  useEffect(() => {
    console.log("Home Component Loaded with Data:", data);
    if (data) {
      setAuth(data.session);
    }
  }, [data, setAuth]);

  return <Container>Home</Container>;
}

const Container = styled("div", {
  height: "100%",
});

export default Home;
