import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./assets/fonts.css";
import "./App.css";
// ====components import ====
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
// import EmailList from "./components/EmailList";

import Mail from "./components/Mail";
import Compose from "./components/Compose";
import DraftList from "./components/DraftList";
import EmailList from "./components/EmailList";
import { Login } from "./components/Login";
// ====redux import ====
import { useDispatch, useSelector } from "react-redux";

import { login, logout } from "./features/userSlice";
// ====helper fns import ====

// ====firebase import ====

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/firebase";
import LogoutModal from "./components/LogoutModal";
import SentList from "./components/SentList";
import ImportantList from "./components/ImportantList";
import StarredList from "./components/StarredList";

function App() {
  const [showCompose, setShowCompose] = useState(false);

  const userStatus = useSelector((state) => state.user.userStatus);
  const logoutModalIsOpen = useSelector(
    (state) => state.user.logoutModalIsOpen
  );
  const dispatch = useDispatch();

  const composeMailHandler = () => {
    setShowCompose(true);
  };

  const closeComposeModalHandler = () => {
    setShowCompose(false);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            dispplayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <Router>
      {!userStatus ? (
        <Login />
      ) : (
        <div className="app">
          <Header />

          <div className="app__body">
            <div className="app__body__sidebar">
              <Sidebar composeMail={composeMailHandler} />
            </div>
            <div className="app__body__emails">
              <Routes>
                <Route path="/mail" element={<Mail />}></Route>
                <Route path="/" element={<EmailList />}></Route>
                <Route path="/drafts" element={<DraftList />}></Route>

                <Route path="/sent" element={<SentList />}></Route>

                <Route path="/important" element={<ImportantList />}></Route>

                <Route path="/starred" element={<StarredList />}></Route>
              </Routes>

              {showCompose && (
                <Compose closeComposeModal={closeComposeModalHandler} />
              )}
              {logoutModalIsOpen && <LogoutModal />}
            </div>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
