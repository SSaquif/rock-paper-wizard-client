import { useEffect } from "react";
import { useUser } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { styled } from "@stitches/react";

function Home() {
  const userContext = useUser();
  let navigate = useNavigate();

  useEffect(() => {
    if (!userContext?.user) {
      console.log("No user found, redirecting to login");
      navigate("/login");
    }
    return () => {};
  }, [userContext?.user]);

  return <Container>Home</Container>;
}

const Container = styled("div", {
  height: "100%",
});

export default Home;
