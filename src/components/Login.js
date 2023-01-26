import { Button } from "@mui/material";
// import React, { , useEffect } from "react";
import gmailLogo from "../assets/gmail_logo.jpg";
import landingPage from "../assets/landing_page_img.webp";
import "./Login.css";
import { provider, auth } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

export const Login = () => {
  const dispatch = useDispatch();

  const loginUser = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) =>
        dispatch(
          login({
            dispplayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        )
      )
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login__header">
        <img src={gmailLogo} alt="gmail-logo" />
        <Button variant="contained" onClick={loginUser}>
          Login
        </Button>
      </div>
      <div className="login__body">
        <div className="login__body__left">
          <h1>Secure, smart, and easy to use email</h1>
          <p>
            Get more done with Gmail. Now integrated with Google Chat, Google
            Meet, and more, all in one place.
          </p>
          <Button
            variant="contained"
            className="login__body__btn"
            onClick={loginUser}
          >
            Login
          </Button>
        </div>
        <div className="login__body__right">
          <img src={landingPage} alt="landing_img" />
        </div>
      </div>

      {/* <Button
        sx={{ backgroundColor: "crimson", color: "white", width: "20rem" }}
        onClick={loginUser}
      >
        Login
      </Button> */}
    </div>
  );
};
