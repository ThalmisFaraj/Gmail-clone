import { useNavigate } from "react-router-dom";
import "./EmailRow.css";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import IconButton from "@mui/material/IconButton";
import markStarred from "../assets/helperFunctions";
import { markImportant } from "../assets/helperFunctions";
import { db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectAMail } from "../features/mailSlice";
import { Avatar } from "@mui/material";

function EmailRow(props) {
  const { id, title, subject, description, starred, time, important, docType } =
    props;

  const splitTime = time.split(" ");
  const month = splitTime.slice(1, 2);
  const date = splitTime.slice(2, 3);

  const avatarAlphabet = title.slice(0, 1).toUpperCase();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobileView = useSelector((state) => state.user.isMobileView);

  const openMail = () => {
    dispatch(
      selectAMail({
        id,
        title,
        subject,
        description,
        starred,
        time,
        important,
      })
    );
    navigate("/mail");
  };

  return !isMobileView ? (
    <>
      <div className="emailRow">
        <div className="emailRow__icons">
          <IconButton>
            <CheckBoxOutlineBlankIcon />
          </IconButton>
          <IconButton onClick={() => markStarred(db, id, docType)}>
            <StarBorderIcon sx={{ color: starred ? "orange" : null }} />
          </IconButton>
          <IconButton onClick={() => markImportant(db, id, docType)}>
            <LabelImportantIcon sx={{ color: important ? "orange" : null }} />
          </IconButton>
        </div>

        <div className="emailRow__details" onClick={openMail}>
          <div className="emailRow__title">
            <h4>{title}</h4>
          </div>
          <div className="emailRow__description ">
            <h5>{subject}</h5>

            <p>
              {"-"}
              {description}
            </p>
          </div>

          <div className="emailRow__time ">
            <p>{time}</p>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="emailRow__mobile">
        <Avatar sx={{ bgcolor: "steelblue" }}>{avatarAlphabet}</Avatar>
        <div className="emailRow__mobile__content" onClick={openMail}>
          <h4>{title.split("@")[0]}</h4>
          <div className="emailRow__mobile__description ">
            <h5>{subject}</h5>
            <p>{description}</p>
          </div>
        </div>
        <div className="emailRow__mobile__time ">
          <p>{`${month} ${date}`}</p>
          <IconButton onClick={() => markStarred(db, id, docType)}>
            <StarBorderIcon sx={{ color: starred ? "orange" : null }} />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default EmailRow;
