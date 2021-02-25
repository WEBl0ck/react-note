import React, { useState } from "react";
import NotesContainer from "../NotesContainer/NotesContainer";
import "./Notes.scss";

const Notes = ({
  notes,
  onRemove,
  noteIsOpen,
  setNoteId,
  changeTitleValue,
  changeBodyValue,
  openNote,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <React.Fragment>
      <textarea
        className="note-search-field"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />

      <NotesContainer
        notes={notes}
        onRemove={onRemove}
        changeTitleValue={changeTitleValue}
        changeBodyValue={changeBodyValue}
        openNote={openNote}
        noteIsOpen={noteIsOpen}
        setNoteId={setNoteId}
        searchTerm={searchTerm}
      />
    </React.Fragment>
  );
};

export default Notes;
