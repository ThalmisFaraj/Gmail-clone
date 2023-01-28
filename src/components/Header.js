import "./Header.css";
import React from "react";

// =====MUI icons=====//
// ===================//
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { openLogoutModal, closeLogoutModal } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userStatus);
  const logoutModalIsOpen = useSelector(
    (state) => state.user.logoutModalIsOpen
  );
  const logoutModal = () => {
    if (logoutModalIsOpen) dispatch(closeLogoutModal());
    else dispatch(openLogoutModal());
  };

  return (
    <div className="header">
      <div className="header__left ">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/512px-Gmail_icon_%282020%29.svg.png?20221017173631"
          alt="gmail logo"
        />
        <h2>Gmail</h2>
      </div>
      <div className="header__middle">
        <SearchIcon />
        <input type="text" placeholder="Search" />
        <ArrowDropDownIcon />
      </div>
      <div className="header__right">
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton onClick={logoutModal}>
          <Avatar src={user?.photoUrl} />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
