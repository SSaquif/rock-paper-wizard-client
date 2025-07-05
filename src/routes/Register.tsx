import { styled } from "@stitches/react";
import BaseButton from "../components/Button";
import { useNavigate, redirect } from "react-router-dom";
import { useEffect } from "react";
import { isValidSession, useAuthContext } from "../context/AuthContext";
import Form from "../components/Form";

function Register() {
  const navigate = useNavigate();
  const { auth } = useAuthContext();

  function handleCancel() {
    navigate("/login");
  }

  // if user is already logged in, redirect to home
  useEffect(() => {
    if (auth && isValidSession(auth)) {
      redirect("/home");
    }
  }, [auth]);

  return (
    <FormContainer>
      <Form method="POST" action="">
        <Form.Title>Register</Form.Title>
        <Form.DataRow type="real">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Input required type="string" id="username" name="username" />
        </Form.DataRow>
        <Form.DataRow type="real">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Input required type="password" name="password" id="password" />
        </Form.DataRow>
        <Form.DataRow type="real">
          <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
          <Form.Input
            required
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
        </Form.DataRow>
        <Form.DataRow type="fake">
          <Form.Label htmlFor="catcher">Fill this field</Form.Label>
          <Form.Input type="text" name="catcher" id="catcher" />
        </Form.DataRow>
        <ButtonContainer>
          <BaseButton type="submit">Register</BaseButton>
          <BaseButton onClick={handleCancel}>Cancel</BaseButton>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
}

const FormContainer = styled("div", {
  border: "1px solid white",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
});

// const RegistrationForm = styled(Form, {
//   border: "1px solid red",
//   display: "flex",
//   flexDirection: "column",
//   gap: "1rem",
//   justifyContent: "center",
//   alignItems: "center",
// });

const ButtonContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
});

export default Register;
