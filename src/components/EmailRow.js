import { useNavigate } from "react-router-dom";
import "./EmailRow.css";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import IconButton from "@mui/material/IconButton";
import markStarred from "../assets/helperFunctions";
import { markImportant } from "../assets/helperFunctions";
import { db } from "./firebase";
import { useDispatch } from "react-redux";
import { selectAMail } from "../features/mailSlice";

function EmailRow(props) {
  const { id, title, subject, description, starred, time, important, docType } =
    props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
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
  );
}

export default EmailRow;
