import React, { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames";

import "./scss/style.scss";
import "./scss/variables.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import NoteField from "./components/NoteField/NoteField";
import Notes from "./components/Notes/Notes";
import Search from "./components/Search/Search";
import Settings from "./components/Settings/Settings";
import Info from "./components/Info/Info";
import ChangeColor from "./components/ChangeColor/ChangeColor";
import LeftArrowButton from "./components/LeftArrowButton/LeftArrowButton";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import { ReactComponent as RightArrow } from "./assets/image/left-arrow-line-symbol.svg";

import { ReactComponent as SettingsIcon } from "./assets/image/settingsBold.svg";
import { ReactComponent as NotesIcon } from "./assets/image/all-notes.svg";
import { ReactComponent as CreateIcon } from "./assets/image/pen.svg";
import { ReactComponent as AttentionIcon } from "./assets/image/information.svg";

function MainApp() {
  const [notes, setNotes] = useState(null);
  const [colors, setColors] = useState(null);
  const [selectedColor, setSelectedColor] = useState(3);
  const [colorName, setColorName] = useState("pink");
  const [colorHex, setColorHex] = useState("#FFBBCC");
  const [titleValue, setTitleValue] = useState("");
  const [bodyValue, setBodyValue] = useState("");
  const [noteIsOpen, setNoteIsOpen] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const [sidebarToogle, setSidebarToogle] = useState(false);

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

  const changeSidebar = () => {
    setSidebarToogle((sidebarToogle) => !sidebarToogle);
  };

  return (
    <div className="wrapper">
      <Router>
        <React.Fragment>
          <div
            className={classNames(
              "left-sidebar",
              sidebarToogle && "left-sidebar-active test"
            )}
          >
            <div className="left-sidebar-container sidebar-container">
              <LeftArrowButton
                changeSidebar={changeSidebar}
                sidebarToogle={sidebarToogle}
              />
              <div className="left-sidebar__top-container">
                <div className="left-sidebar__notes-icon">
                  <NavLink
                    className="transparent-border"
                    activeClassName="is-active"
                    to="/notes"
                  >
                    <NotesIcon className="notes-icon" width="33" height="33" />
                    {sidebarToogle && (
                      <p className="left-sidebar__notes-text left-sidebar__notes">
                        All Notes
                      </p>
                    )}
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
                    {sidebarToogle && (
                      <p className="left-sidebar__notes-text left-sidebar__create">
                        Create Note
                      </p>
                    )}
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
                    {sidebarToogle && (
                      <p className="left-sidebar__notes-text left-sidebar__create">
                        Settings
                      </p>
                    )}
                  </NavLink>
                </div>
                <div className="left-sidebar__info-icon">
                  <NavLink
                    className="transparent-border"
                    activeClassName="is-active"
                    to="/info"
                  >
                    <AttentionIcon width="33" height="33" />
                    {sidebarToogle && (
                      <p className="left-sidebar__notes-text">Information</p>
                    )}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>

        <div className="main-frame">
          <Switch>
            <Route exact path="/">
              <NoteField
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
                colorHex={colorHex}
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
            <RightArrow width="33" height="33" className="right-sidebar-icon" />
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
