import React from "react";
import axios from "axios";

import "./NoteField.scss";

import { ReactComponent as AttentionIcon } from "../../assets/image/information.svg";

import AddNote from "../AddNote/AddNote";

const NoteField = ({
  onAddNote,
  titleValue,
  bodyValue,
  notes,
  setTitleValue,
  setBodyValue,
  colors,
  noteIsOpen,
  noteId,
  setNotes,
  setNoteIsOpen,
  selectedColor,
  colorHex,
}) => {
  const saveNote = () => {
    if (!titleValue) {
      alert("Введите название списка");
      return;
    }

    if (notes) {
      const newList = notes.map((item) => {
        if (item.id === noteId) {
          // Заменяем старое название на новое
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
      .then(
        setNoteIsOpen((noteIsOpen) => !noteIsOpen),
        setTitleValue(""),
        setBodyValue("")
      )
      .catch(() => {
        alert("Ошибка при добавлении списка!");
      });
  };

  const cancelAction = () => {
    setNoteIsOpen((noteIsOpen) => !noteIsOpen);
    setTitleValue("");
    setBodyValue("");
  };

  return (
    <div className="main-frame">
      <div className="top-bar">
        <textarea
          className="note-title-field"
          type="text"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          placeholder="Type title here"
        />
        {(titleValue || bodyValue) && (
          <div className="note-unsaved-changes">
            <p>Unsaved changes</p>
            <AttentionIcon className="unsaved-changes-icon" width="23" />
          </div>
        )}
        <form name="note-title-form" action="/"></form>
      </div>
      <div className="note-menu">
        <div className="note-body-section">
          <form name="note-body-form" action="/">
            <textarea
              className="note-body-field"
              type="text"
              value={bodyValue}
              onChange={(e) => setBodyValue(e.target.value)}
            />
          </form>
        </div>
        {noteIsOpen ? (
          <div className="edit-note-button-field">
            <button className="save-note-button" onClick={saveNote}>
              Save Note
            </button>
            <button className="cancel-note-button" onClick={cancelAction}>
              Cancel
            </button>
          </div>
        ) : (
          <AddNote
            onAdd={onAddNote}
            titleValue={titleValue}
            bodyValue={bodyValue}
            notes={notes}
            colors={colors}
            selectedColor={selectedColor}
            colorHex={colorHex}
          />
        )}
      </div>
    </div>
  );
};

export default NoteField;
