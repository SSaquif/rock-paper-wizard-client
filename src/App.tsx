// import { useEffect, useState } from "react";
import globalStyles from "./GlobalStyles";
import { styled } from "./stitches-theme";

function App() {
  globalStyles();

  // testing
  // useEffect(() => {
  //   const users = fetch("/api/users")
  //     .then((response) => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  return <Container>hello</Container>;
}

const Container = styled("div", {
  border: "1px solid red",
  height: "100%",
  "@tabletAndUp": {},
});

export default App;
