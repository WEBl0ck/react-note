import React, { useState, useEffect } from "react";
import axios from "axios";

import "./scss/style.scss";
import "./scss/variables.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import NoteField from "./components/NoteField/NoteField";
import Notes from "./components/Notes/Notes";
import Search from "./components/Search/Search";
import Settings from "./components/Settings/Settings";
import Info from "./components/Info/Info";
import ChangeColor from "./components/ChangeColor/ChangeColor";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import rightArrow from "./assets/image/left-arrow-line-symbol.svg";
import leftArrow from "./assets/image/right-arrow-angle.svg";
import { ReactComponent as SettingsIcon } from "./assets/image/settingsBold.svg";
import { ReactComponent as NotesIcon } from "./assets/image/all-notes.svg";
import { ReactComponent as CreateIcon } from "./assets/image/pen.svg";
import { ReactComponent as AttentionIcon } from "./assets/image/information.svg";

function MainApp() {
  const [notes, setNotes] = useState(null);
  const [colors, setColors] = useState(null);
  const [selectedColor, setSelectedColor] = useState(3);
  const [colorName, setColorName] = useState("pink");
  const [colorHex, setColorHex] = useState(null);
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

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

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

  const changeColor = (color) => {
    setSelectedColor(color.id);
    setColorName(color.name);
    setColorHex(color.hex);
  };

  return (
    <div className="wrapper">
      <Router>
        <div>
          <div className="left-sidebar">
            <div className="left-sidebar-container sidebar-container">
              <img src={leftArrow} alt="" className="left-sidebar-icon" />
              <div className="left-sidebar__top-container">
                <div className="left-sidebar__notes-icon">
                  <NavLink
                    className="transparent-border"
                    activeClassName="is-active"
                    to="/notes"
                  >
                    <NotesIcon className="notes-icon" width="33" height="33" />
                  </NavLink>
                </div>

                <div className="left-sidebar__create-icon">
                  <NavLink
                    className="transparent-border"
                    exact={true}
                    activeClassName="is-active"
                    to="/"
                  >
                    <CreateIcon
                      className="create-note-icon"
                      height="33"
                      width="33"
                    />
                  </NavLink>
                </div>
              </div>
              <div className="left-sidebar__middle-container"></div>
              <div className="left-sidebar__bottom-container">
                <div className="left-sidebar__setting-icon">
                  <NavLink
                    className="transparent-border"
                    activeClassName="is-active"
                    to="/settings"
                  >
                    <SettingsIcon width="33" height="33" />
                  </NavLink>
                </div>
                <div className="left-sidebar__info-icon">
                  <NavLink
                    className="transparent-border"
                    activeClassName="is-active"
                    to="/info"
                  >
                    <AttentionIcon width="33" height="33" />
                  </NavLink>
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
                selectedColor={selectedColor}
                colorHex={colorHex}
              />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/notes">
              <Notes
                notes={notes}
                colors={colors}
                onRemove={onRemove}
                setTitleValue={setTitleValue}
                setBodyValue={setBodyValue}
                setNoteIsOpen={setNoteIsOpen}
                noteIsOpen={noteIsOpen}
                setNoteId={setNoteId}
                selectedColor={selectedColor}
                colorHex={colorHex}
              />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/info">
              <Info />
            </Route>
          </Switch>
        </div>
        <div className="right-sidebar">
          <div className="right-sidebar-container sidebar-container">
            <img src={rightArrow} alt="" className="right-sidebar-icon" />
            <div className="right-sidebar__inner-container">
              <ChangeColor
                colors={colors}
                selectedColor={selectedColor}
                colorName={colorName}
                changeColor={changeColor}
              />
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default MainApp;
