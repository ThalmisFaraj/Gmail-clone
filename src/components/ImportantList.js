import React, { useEffect, useState } from "react";
import "./EmailList.css";

// ==== MUI Icons ========
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardIcon from "@mui/icons-material/Keyboard";

// ==== React Components ========
import EmailRow from "./EmailRow";

// ======firestore imports =========
import { db } from "./firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

// ======redux imports =========
import { countImportant } from "../features/mailSlice";
import { useDispatch } from "react-redux";

function ImportantList() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, "important"), orderBy("time", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let items = [];
      snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      setData(items);
      const mailCount = items.length;
      dispatch(countImportant(mailCount));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="emailList">
      <div className="emailList__settings">
        <div className="emailList__settings__left">
          <IconButton>
            <CheckBoxOutlineBlankIcon />
          </IconButton>
          <IconButton>
            <RefreshIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="emailList__settings__right">
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

      <div className="emailList__List">
        {data.map(
          ({ id, to, subject, starred, content, time, important, docType }) => (
            <EmailRow
              key={id}
              id={id}
              title={to}
              subject={subject}
              starred={starred}
              important={important}
              description={content}
              docType={docType}
              time={time.toDate().toDateString()}
            />
          )
        )}
      </div>
    </div>
  );
}

export default ImportantList;
