import React, { useState } from "react";
import ReactDom from "react-dom";
import "./Compose.css";
import { useForm } from "react-hook-form";

// ======== Firestore =============
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
// ==== MUI components =========
// import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

// ======= Helper functions =========

function Compose({ closeComposeModal }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  watch("to");

  const fallbackSubject = "(no subject)";
  const fallbackContent = "(no content)";

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const [minimiseComposeModal, setminimiseComposeModal] = useState(false);

  const toggleMinimise = () => {
    setminimiseComposeModal((prev) => !prev);
  };

  // ==== Fn to send mail ====
  const sendMail = async (data) => {
    console.log(data);

    try {
      const docRef = await addDoc(collection(db, "sent"), {
        to: data.to,
        subject: data.subject ? data.subject : fallbackSubject,
        content: data.content ? data.content : fallbackContent,
        starred: false,
        important: false,
        time: serverTimestamp(),
        docType: "sent mail",
      });
      console.log("Mail sent with ID: ", docRef.Id);
      closeComposeModal();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // ==== Fn to save draft ====
  const saveAsDraft = async (data) => {
    console.log("draft saved as");
    console.log(data);

    try {
      const docRef = await addDoc(collection(db, "drafts"), {
        to: data.to,
        subject: data.subject ? data.subject : fallbackSubject,
        content: data.content ? data.content : fallbackContent,
        starred: false,
        important: false,
        time: serverTimestamp(),
        docType: "draft",
      });

      console.log("Draft saved with ID: ", docRef.Id);
      closeComposeModal();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return ReactDom.createPortal(
    <div className="compose">
      <div className="compose__header">
        <p>New Message</p>
        <div className="compose__header__options">
          <IconButton>
            <MinimizeIcon onClick={toggleMinimise} />
          </IconButton>
          <IconButton>
            <CloseIcon onClick={closeComposeModal} />
          </IconButton>
        </div>
      </div>

      {!minimiseComposeModal && (
        <div className="compose__body">
          <form className="compose__form">
            <input
              type="text"
              placeholder="To"
              id="to-address"
              {...register("to", {
                required: "* Email is required.",
                pattern: {
                  value: emailRegex,
                  message: "Email is not valid.",
                },
              })}
            />
            {errors.to && (
              <p className="compose__input-error">{errors.to.message}</p>
            )}
            <input
              {...register("subject")}
              type="text"
              placeholder="Subject"
              id="subject"
            />
            {/* <input type="text" id="content" /> */}
            <textarea {...register("content")} id="content" />
          </form>
          <div className="compose__btns">
            <IconButton onClick={handleSubmit(sendMail)}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#3b558c", color: "white" }}
              >
                Send
              </Button>
            </IconButton>
            <IconButton onClick={handleSubmit(saveAsDraft)}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#3b558c", color: "white" }}
              >
                Save as Draft
              </Button>
            </IconButton>
          </div>
        </div>
      )}
    </div>,
    document.getElementById("portal")
  );
}

export default Compose;
