import { styled } from "../stitches-theme";

const Button = styled("button", {
  padding: "1rem 2rem",
  margin: "1rem",
  fontSize: "1.5rem",
  backgroundColor: "var(--gray-300)",
  borderRadius: "0.5rem",
  border: "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "var(--gray-400)",
  },
});

export default Button;
