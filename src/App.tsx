import { useEffect, useState } from "react";
import globalStyles from "./GlobalStyles";

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

  return <div>hello</div>;
}

export default App;
