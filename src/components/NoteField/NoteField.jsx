import React, { useState, useEffect } from "react";

import "./NoteField.scss";

import { ReactComponent as AttentionIcon } from "../../assets/image/information.svg";

import ShowNotification from "../ShowNotification/ShowNotification";
import AddNote from "../AddNote/AddNote";

const NoteField = ({
  onAddNote,
  titleValue,
  bodyValue,
  cancelAction,
  colorHex,
  colorName,
  saveNote,
  changeTitleValue,
  changeBodyValue,
  noteIsOpen,
}) => {
  const [saveNotification, setSaveNotification] = useState(false);

  useEffect(() => {
    let showSaveNotificationVariable = setTimeout(
      () => setSaveNotification(false),
      3000
    );

    return () => {
      clearTimeout(showSaveNotificationVariable);
    };
  }, [saveNotification]);

  const showSaveNotification = () => {
    setSaveNotification((saveNotification) => !saveNotification);
  };

  return (
    <React.Fragment>
      <div className="top-bar">
        <textarea
          className="note-title-field"
          type="text"
          value={titleValue}
          onChange={(e) => changeTitleValue(e.target.value)}
          placeholder="Type title here"
        />
        {(titleValue || bodyValue) && (
          <div className="note-unsaved-changes">
            <p>
              Unsaved{" "}
              <span className="note-unsaved-changes__word">changes</span>
            </p>
            <AttentionIcon
              className="unsaved-changes-icon"
              width="23"
              height="23"
            />
          </div>
        )}
      </div>
      <div className="note-menu">
        <div className="note-body-section">
          <textarea
            className="note-body-field"
            type="text"
            value={bodyValue}
            onChange={(e) => changeBodyValue(e.target.value)}
          />

          {saveNotification && (
            <ShowNotification
              notificationName={"Note Saved"}
              notificationColor={"rgba(65, 67, 222, 0.8)"}
            />
          )}
        </div>
        {noteIsOpen ? (
          <div className="edit-note-button-field">
            <button
              className="save-note-button"
              onClick={() => {
                saveNote();
                showSaveNotification();
              }}
            >
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
            colorHex={colorHex}
            colorName={colorName}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default NoteField;
