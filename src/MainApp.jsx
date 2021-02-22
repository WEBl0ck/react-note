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
import RightArrowButton from "./components/RightArrowButton/RightArrowButton";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import { ReactComponent as SettingsIcon } from "./assets/image/settingsBold.svg";
import { ReactComponent as NotesIcon } from "./assets/image/all-notes.svg";
import { ReactComponent as CreateIcon } from "./assets/image/pen.svg";
import { ReactComponent as AttentionIcon } from "./assets/image/information.svg";

function MainApp() {
  const [notes, setNotes] = useState(null);
  const [colors, setColors] = useState(null);
  const [selectedColor, setSelectedColor] = useState(3);
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState(null);
  const [titleValue, setTitleValue] = useState("");
  const [bodyValue, setBodyValue] = useState("");
  const [noteIsOpen, setNoteIsOpen] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const [leftSidebarToogle, setLeftSidebarToogle] = useState(false);
  const [rightSidebarToogle, setRightSidebarToogle] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then(({ data }) => {
      setNotes(data);
    });

    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });

    axios.get("http://localhost:3001/selectedColor/1").then(({ data }) => {
      setColorHex(data.hex);
      setColorName(data.colorName);
    });
  }, []);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const openNote = () => {
    setNoteIsOpen((noteIsOpen) => !noteIsOpen);
  };

  const saveNote = () => {
    if (!titleValue) {
      alert("Введите название списка");
      return;
    }

    if (notes) {
      const newList = notes.map((item) => {
        if (item.id === noteId) {
          item.title = titleValue;
          item.body = bodyValue;
          item.colorHex = colorHex;
        }
        return item;
      });
      setNotes(newList);
    }

    axios
      .patch("http://localhost:3001/notes/" + noteId, {
        title: titleValue,
        body: bodyValue,
        colorHex: colorHex,
      })
      .then(openNote(), setTitleValue(""), setBodyValue(""))
      .catch(() => {
        alert("Ошибка при добавлении списка!");
      });

    axios.patch("http://localhost:3001/selectedColor/1", {
      hex: colorHex,
      colorName: colorName,
    });
  };

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

  const cancelAction = () => {
    openNote();
    setTitleValue("");
    setBodyValue("");
  };

  const changeLeftSidebar = () => {
    setLeftSidebarToogle((leftSidebarToogle) => !leftSidebarToogle);
  };

  const changeRightSidebar = () => {
    setRightSidebarToogle((rightSidebarToogle) => !rightSidebarToogle);
  };

  const changeTitleValue = (e, title) => {
    setTitleValue(e, title);
  };

  const changeBodyValue = (e, body) => {
    setBodyValue(e, body);
  };

  return (
    <div className="wrapper">
      <Router>
        <React.Fragment>
          <div
            className={classNames(
              "left-sidebar",
              leftSidebarToogle && "sidebar-active"
            )}
          >
            <div className="left-sidebar-container sidebar-container">
              <LeftArrowButton
                changeLeftSidebar={changeLeftSidebar}
                leftSidebarToogle={leftSidebarToogle}
              />
              <div className="left-sidebar__top-container">
                <div className="left-sidebar__notes-icon">
                  <NavLink
                    className="transparent-border"
                    activeClassName="is-active"
                    to="/notes"
                  >
                    <NotesIcon className="notes-icon" width="33" height="33" />
                    {leftSidebarToogle && (
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
                    {leftSidebarToogle && (
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
                    {leftSidebarToogle && (
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
                    {leftSidebarToogle && (
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
                changeTitleValue={changeTitleValue}
                changeBodyValue={changeBodyValue}
                notes={notes}
                saveNote={saveNote}
                cancelAction={cancelAction}
                noteIsOpen={noteIsOpen}
                noteId={noteId}
                colorHex={colorHex}
                colorName={colorName}
              />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/notes">
              <Notes
                notes={notes}
                onRemove={onRemove}
                changeTitleValue={changeTitleValue}
                changeBodyValue={changeBodyValue}
                openNote={openNote}
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

        <div
          className={classNames(
            "right-sidebar",
            rightSidebarToogle && "sidebar-active"
          )}
        >
          <div className="right-sidebar-container sidebar-container">
            <RightArrowButton
              changeRightSidebar={changeRightSidebar}
              rightSidebarToogle={rightSidebarToogle}
            />
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
