import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

import "./NotesContainer.scss";

const NotesContainer = ({
  notes,
  onRemove,
  setTitleValue,
  setBodyValue,
  setNoteIsOpen,
  noteIsOpen,
  setNoteId,
}) => {
  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить заметку?")) {
      axios.delete("http://localhost:3001/notes/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  const openNoteHandler = (item) => {
    setNoteIsOpen((noteIsOpen) => !noteIsOpen);
    setTitleValue(item.title);
    setBodyValue(item.body);
    setNoteId(item.id);
  };

  return notes ? (
    <Container fluid>
      <Row className="notes-list">
        {notes.map((item, index) => (
          <Col className="note-item" key={index}>
            <div className="note-item__title">
              {item.title}|{item.id}
            </div>
            <div className="note-item__body">{item.body}</div>
            <button
              className="note-item__open-button"
              onClick={() => openNoteHandler(item)}
            >
              Open
            </button>
            {noteIsOpen && (
              <Redirect
                to={{
                  pathname: "/",
                }}
              />
            )}
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
