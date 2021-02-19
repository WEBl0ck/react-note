import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

import ShowNotification from "../ShowNotification/ShowNotification";

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
  const [deleteNotification, setDeleteNotification] = useState(false);

  useEffect(() => {
    let showDeleteNotification = setTimeout(
      () => setDeleteNotification(false),
      3000
    );

    return () => {
      clearTimeout(showDeleteNotification);
    };
  }, [deleteNotification]);

  const showDeleteNotification = () => {
    setDeleteNotification((deleteNotification) => !deleteNotification);
  };

  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить заметку?")) {
      axios.delete("http://localhost:3001/notes/" + item.id).then(() => {
        onRemove(item.id);
        showDeleteNotification();
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
    <Container fluid className="notes-container">
      <Row className="notes-list">
        {notes.map((item) => (
          <Col
            className="note-item"
            style={{ backgroundColor: item.colorHex }}
            key={item.id}
          >
            <div className="note-item__title">{item.title}</div>
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
              onClick={() => {
                removeList(item);
              }}
            >
              Delete
            </button>
          </Col>
        ))}
      </Row>
      {deleteNotification && (
        <ShowNotification
          notificationName={"Note Deleted"}
          notificationColor={"rgba(224, 67, 83, 0.8)"}
        />
      )}
    </Container>
  ) : (
    "Loading..."
  );
};

export default NotesContainer;
