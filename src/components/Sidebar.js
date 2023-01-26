import React from "react";
import "./Sidebar.css";
// ====Components ===========
import SidebarOptions from "./SidebarOptions";

// ======= MUI Icons ===========
import Button from "@mui/material/Button";
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
import { useSelector } from "react-redux";

export default function Sidebar({ composeMail }) {
  const countOfInbox = useSelector((state) => state.mail.inbox);
  const countOfStarred = useSelector((state) => state.mail.starred);
  const countOfImportant = useSelector((state) => state.mail.important);
  const countOfDrafts = useSelector((state) => state.mail.drafts);
  const countOfSent = useSelector((state) => state.mail.sent);

  return (
    <div className="sidebar">
      <Button startIcon={<CreateIcon fontSize="large" />} onClick={composeMail}>
        Compose
      </Button>
      <div className="sidebar__options__container">
        <NavLink to="/">
          <SidebarOptions
            Icon={InboxIcon}
            title="Inbox"
            number={countOfInbox}
          />
        </NavLink>
        <NavLink to="/starred">
          <SidebarOptions
            Icon={StarOutlineIcon}
            title="Starred"
            number={countOfStarred}
          />
        </NavLink>
        <SidebarOptions Icon={AccessTimeIcon} title="Snoozed" number={15} />
        <NavLink to="/important">
          <SidebarOptions
            Icon={LabelImportantIcon}
            title="Important"
            number={countOfImportant}
          />
        </NavLink>
        <NavLink to="/sent">
          <SidebarOptions Icon={SendIcon} title="Sent" number={countOfSent} />
        </NavLink>
        <NavLink to="/drafts">
          <SidebarOptions
            Icon={DescriptionIcon}
            title="Draft"
            number={countOfDrafts}
          />
        </NavLink>
        <SidebarOptions Icon={KeyboardArrowDownIcon} title="More" number={""} />
      </div>
    </div>
  );
}
