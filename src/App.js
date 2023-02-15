import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./assets/fonts.css";
import "./App.css";
// ====components import ====
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import useWindowSize from "./hooks/useWindowSize";
import { CollapsedSidebar } from "./components/CollapsedSidebar";
// import EmailList from "./components/EmailList";

import Mail from "./components/Mail";
import Compose from "./components/Compose";
import DraftList from "./components/DraftList";
import EmailList from "./components/EmailList";
import { Login } from "./components/Login";
// ====redux import ====
import { useDispatch, useSelector } from "react-redux";

import {
  login,
  logout,
  adjustToMobileView,
  adjustToEnlargedView,
} from "./features/userSlice";
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
  const [showSidebar, setShowSidebar] = useState(true);
  const [showCollapsedSidebar, setShowCollapsedSidebar] = useState(true);
  const [mobileView, setMobileView] = useState(false);

  const [width] = useWindowSize();
  const dispatch = useDispatch();

  useEffect(() => {
    if (width < 500) {
      setShowSidebar(false);
      setShowCollapsedSidebar(true);
      setMobileView(true);
      dispatch(adjustToMobileView());
    } else {
      setShowSidebar(true);
      setShowCollapsedSidebar(false);
      setMobileView(false);
      dispatch(adjustToEnlargedView());
    }
  }, [width, dispatch]);

  const userStatus = useSelector((state) => state.user.userStatus);

  const logoutModalIsOpen = useSelector(
    (state) => state.user.logoutModalIsOpen
  );

  const toggleSidebar = () => {
    setShowCollapsedSidebar((prev) => !prev);
  };

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
          <Header mobileView={mobileView} toggleSidebar={toggleSidebar} />

          <div className="app__body">
            <div className="app__body__sidebar">
              {showSidebar && !showCollapsedSidebar && (
                <Sidebar
                  composeMail={composeMailHandler}
                  showSidebar={showSidebar}
                />
              )}
              {showCollapsedSidebar && !showSidebar && (
                <CollapsedSidebar composeMail={composeMailHandler} />
              )}
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
