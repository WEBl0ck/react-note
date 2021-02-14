import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import "./NoteField.scss";

import AddNote from "../AddNote/AddNote";

const NoteField = ({
  onAddNote,
  titleValue,
  bodyValue,
  notes,
  setTitleValue,
  setBodyValue,
  colors,
}) => {
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
        <AddNote
          onAdd={onAddNote}
          titleValue={titleValue}
          bodyValue={bodyValue}
          notes={notes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default NoteField;
