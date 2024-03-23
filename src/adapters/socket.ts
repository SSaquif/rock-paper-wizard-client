import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
// Need to add env variable
// const URL =
//   process.env.NODE_ENV === "production"
//     ? "https://rock-paper-wizard.herokuapp.com"
//     : "http://localhost:8080";

const GAMES_URL = "http://localhost:8080/games";
// const ADMIN_URL = "http://localhost:8080/admin";

export const gameSocket = io(GAMES_URL, { autoConnect: false });
