import React, { useState } from "react";
import NotesContainer from "../NotesContainer/NotesContainer";
import "./Notes.scss";

const Notes = ({
  notes,
  onRemove,
  setTitleValue,
  setBodyValue,
  setNoteIsOpen,
  noteIsOpen,
  setNoteId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const testSearch = ["Test1", "Test2", "Test3", "Test4", "Test5"];

  return (
    <div className="notes-frame">
      <textarea
        className="note-search-field"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      {searchTerm ? (
        testSearch.filter((name) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ) : (
        <NotesContainer
          notes={notes}
          onRemove={onRemove}
          setTitleValue={setTitleValue}
          setBodyValue={setBodyValue}
          setNoteIsOpen={setNoteIsOpen}
          noteIsOpen={noteIsOpen}
          setNoteId={setNoteId}
        />
      )}
    </div>
  );
};

export default Notes;
