import React, { useState } from "react";
import NotesContainer from "../NotesContainer/NotesContainer";
import "./Notes.scss";

const Notes = ({
  notes,
  colors,
  onRemove,
  setTitleValue,
  setBodyValue,
  setNoteIsOpen,
  noteIsOpen,
  setNoteId,
  selectedColor,
  colorHex,
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
      )}
    </div>
  );
};

export default Notes;
