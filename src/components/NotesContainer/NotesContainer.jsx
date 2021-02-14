import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

import "./NotesContainer.scss";

const NotesContainer = ({ notes, onRemove }) => {
  const [noteIsOpen, setNoteIsOpen] = useState(false);

  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить заметку?")) {
      axios.delete("http://localhost:3001/notes/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  const openNoteHandler = (itemId) => {
    setNoteIsOpen((noteIsOpen) => !noteIsOpen);
  };

  const openNote = (itemId) => {
    const currentId = itemId;
    return currentId;
  };

  console.log(noteIsOpen);

  return notes ? (
    <Container fluid>
      <Row className="notes-list">
        {notes.map((item, index) => (
          <Col className="note-item" key={index}>
            <div className="note-item__title">{item.title}</div>
            <div className="note-item__body">{item.body}</div>
            <button
              className="note-item__open-button"
              onClick={openNoteHandler}
            >
              Open
            </button>
            {noteIsOpen && <Link to={{ pathname: "/", data: item.id }} />}
            {}
            <button
              className="note-item__delete-button"
              onClick={() => removeList(item)}
            >
              Delete
            </button>
          </Col>
        ))}
      </Row>
    </Container>
  ) : (
    "Loading..."
  );
};

export default NotesContainer;
