import React, { useState, useEffect } from "react";
import axios from "axios";

import "./scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import NoteField from "./components/NoteField/NoteField";
import Notes from "./components/Notes/Notes";
import Search from "./components/Search/Search";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import rightArrow from "./assets/image/left-arrow-line-symbol.svg";
import leftArrow from "./assets/image/right-arrow-angle.svg";
import userIcon from "./assets/image/user.svg";
import settingsIcon from "./assets/image/settings.svg";
import notesIcon from "./assets/image/all-notes.svg";
import searchIcon from "./assets/image/search.svg";
import createIcon from "./assets/image/pen.svg";

function MainApp() {
  const [notes, setNotes] = useState(null);
  const [colors, setColors] = useState(null);
  const [titleValue, setTitleValue] = useState("");
  const [bodyValue, setBodyValue] = useState("");
  const [noteIsOpen, setNoteIsOpen] = useState(false);
  const [noteId, setNoteId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then(({ data }) => {
      setNotes(data);
    });

    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddNote = (obj) => {
    const newList = [...notes, obj];
    setNotes(newList);
    setTitleValue("");
    setBodyValue("");
  };

  const onRemove = (id) => {
    const newLists = notes.filter((item) => item.id !== id);
    setNotes(newLists);
  };

  console.log(noteIsOpen);

  return (
    <div className="wrapper">
      <Router>
        <div>
          <div className="left-sidebar">
            <div className="left-sidebar-container sidebar-container">
              <img src={leftArrow} alt="" className="left-sidebar-icon" />
              <div className="left-sidebar__top-container">
                <div className="left-sidebar__notes-icon">
                  <Link to="/notes">
                    <img src={notesIcon} alt="" />
                  </Link>
                </div>
                <div className="left-sidebar__search-icon">
                  <Link to="/search">
                    <img src={searchIcon} alt="" />
                  </Link>
                </div>
                <div className="left-sidebar__create-icon">
                  <Link to="/">
                    <img src={createIcon} alt="" />
                  </Link>
                </div>
              </div>
              <div className="left-sidebar__middle-container"></div>
              <div className="left-sidebar__bottom-container">
                <div className="left-sidebar__user-icon">
                  <img src={userIcon} alt="" />
                </div>
                <div className="left-sidebar__setting-icon">
                  <img src={settingsIcon} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main-frame">
          <Switch>
            <Route exact path="/">
              <NoteField
                colors={colors}
                onAddNote={onAddNote}
                titleValue={titleValue}
                bodyValue={bodyValue}
                notes={notes}
                setTitleValue={setTitleValue}
                setBodyValue={setBodyValue}
                noteIsOpen={noteIsOpen}
                noteId={noteId}
                setNotes={setNotes}
                setNoteIsOpen={setNoteIsOpen}
              />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/notes">
              <Notes
                notes={notes}
                onRemove={onRemove}
                setTitleValue={setTitleValue}
                setBodyValue={setBodyValue}
                setNoteIsOpen={setNoteIsOpen}
                noteIsOpen={noteIsOpen}
                setNoteId={setNoteId}
              />
            </Route>
          </Switch>
        </div>
        <div className="right-sidebar">
          <div className="right-sidebar-container sidebar-container">
            <img src={rightArrow} alt="" className="right-sidebar-icon" />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default MainApp;
