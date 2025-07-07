import { Session } from "@ssaquif/rock-paper-wizard-api-types-and-schema";
import { styled } from "@stitches/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import Button from "../components/Button";
import { logoutUser } from "../api/logout-user";

function Home() {
  const navigate = useNavigate();
  const data = useLoaderData() as { isError: false; session: Session };
  const { setAuth } = useAuthContext();

  useEffect(() => {
    console.log("Home Component Loaded with Data:", data);
    if (data) {
      setAuth(data.session);
    }
  }, [data, setAuth]);

  async function handleLogout() {
    // clear session and redirect to login
    const data = await logoutUser();
    if (data.isError) {
      console.error("Logout failed:", data.error);
      return;
    }
    console.log("Logout successful:", data.message);
    setAuth(null); // Clear auth context
    navigate("/login");
  }

  return (
    <Container>
      <Button onClick={handleLogout}>Logout</Button>
    </Container>
  );
}

const Container = styled("div", {
  height: "100%",
});

export default Home;
