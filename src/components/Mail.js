import React from "react";
import "./Mail.css";

// ===== MUI components =========
import { Avatar } from "@mui/material";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import LabelIcon from "@mui/icons-material/Label";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardIcon from "@mui/icons-material/Keyboard";

import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Mail() {
  const navigate = useNavigate("/");
  const selectedMail = useSelector((state) => state.mail.selectedMail);
  // const { id, title, subject, description, starred, time, important } =
  //   selectedMail;

  // const currentTime = new Date();
  // console.log(originalTime.seconds);

  // const calculateTime = (timeNow, mailTime) => {
  //   const currentInMilli = timeNow.getTime();
  //   // const mailTimeInMilli = mailTime.getTime();
  //   // const timeDiff = (currentInMilli - mailTimeInMilli) / (60 * 1000);
  //   // console.log(timeDiff);
  // };

  // calculateTime(currentTime, originalTime);
  return (
    <div className="mail__body">
      <div className="mail__topSection">
        <IconButton onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </IconButton>
        <div className="mail__topSection__left">
          <div className="mail__topSection__sec1">
            <IconButton>
              <MoveToInboxIcon />
            </IconButton>
            <IconButton>
              <ReportGmailerrorredIcon />
            </IconButton>
            <IconButton>
              <DeleteOutlineIcon />
            </IconButton>
          </div>
          <div className="mail__topSection__sec2">
            <IconButton>
              <MailOutlineIcon />
            </IconButton>
            <IconButton>
              <AccessTimeIcon />
            </IconButton>
            <IconButton>
              <AddTaskIcon />
            </IconButton>
          </div>
          <div className="mail__topSection__sec3">
            <IconButton>
              <DriveFileMoveIcon />
            </IconButton>
            <IconButton>
              <LabelIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="mail__topSection__right">
          <IconButton>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton>
            <KeyboardArrowRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardIcon />
          </IconButton>
        </div>
      </div>
      <div className="mail__body__bottom">
        <div className="mail__body__bottom__title">
          <h1>{selectedMail?.subject}</h1>
          <span>
            <LabelIcon />
          </span>
        </div>
        <div className="mail__body__senderDetail">
          <Avatar sx={{ backgroundColor: "#a0c3ff", color: "#4374e0" }} />
          <div className="mail__body__senderDetail__Address">
            <h4>{`<from address>`}</h4>
            <p>to me </p>
          </div>
          <div className="mail__body__senderDetail__right">
            <p>{selectedMail?.time}</p>
          </div>
        </div>
        <div className="mail__body__content">
          <p>{selectedMail?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Mail;
