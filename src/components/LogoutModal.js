import { Avatar, Button, IconButton } from "@mui/material";
import React from "react";
import ReactDom from "react-dom";
import "./LogoutModal.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function LogoutModal() {
  const user = useSelector((state) => state.user.userStatus);

  const dispatch = useDispatch();

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return ReactDom.createPortal(
    <div className="logout__modal">
      <div className="logout__modal__top">
        <Avatar src={user?.photoUrl} />
        <h3>{user?.dispplayName}</h3>
        <p>{user?.email}</p>
      </div>
      <hr />
      <IconButton onClick={logoutUser}>
        <Button variant="contained">Logout</Button>
      </IconButton>
    </div>,
    document.getElementById("portal")
  );
}

export default LogoutModal;
