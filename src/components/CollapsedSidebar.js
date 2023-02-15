import React from "react";

import CreateIcon from "@mui/icons-material/Create";
import InboxIcon from "@mui/icons-material/Inbox";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import SendIcon from "@mui/icons-material/Send";
import DescriptionIcon from "@mui/icons-material/Description";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

import { IconButton } from "@mui/material";

import "./CollapsedSidebar.css";

export const CollapsedSidebar = (props) => {
  const { composeMail } = props;

  return (
    <div className="collapsed__sidebar">
      <IconButton onClick={composeMail}>
        <CreateIcon
          fontSize="small"
          sx={{
            bgcolor: "lightblue",
            fontSize: "2.5rem",
            padding: "0.35rem",
            borderRadius: "5rem",
          }}
        />
      </IconButton>
      <div className="sidebar__options__container">
        <NavLink to="/">
          <InboxIcon />
        </NavLink>
        <NavLink to="/starred">
          <StarOutlineIcon />
        </NavLink>
        <AccessTimeIcon />
        <NavLink to="/important">
          <LabelImportantIcon />
        </NavLink>
        <NavLink to="/sent">
          <SendIcon />
        </NavLink>
        <NavLink to="/drafts">
          <DescriptionIcon />
        </NavLink>
        <KeyboardArrowDownIcon />
      </div>
    </div>
  );
};
