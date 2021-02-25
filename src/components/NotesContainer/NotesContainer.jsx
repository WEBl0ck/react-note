import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

import ShowNotification from "../ShowNotification/ShowNotification";

import "./NotesContainer.scss";

const NotesContainer = ({
  notes,
  onRemove,
  changeTitleValue,
  changeBodyValue,
  noteIsOpen,
  setNoteId,
  openNote,
  searchTerm,
}) => {
  const [deleteNotification, setDeleteNotification] = useState(false);

  const currentNotes = notes || [];

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
    openNote();
    changeTitleValue(item.title);
    changeBodyValue(item.body);
    setNoteId(item.id);
  };

  const data = currentNotes.map((item) => (
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
      <button
        className="note-item__delete-button"
        onClick={() => {
          removeList(item);
        }}
      >
        Delete
      </button>
    </Col>
  ));

  let filteredData = data.filter((e) => {
    return e.props.children[0].props.children
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return currentNotes ? (
    <div className="notes-container">
      <Container fluid>
        <Row className="notes-list">{searchTerm ? filteredData : data}</Row>
        {deleteNotification && (
          <ShowNotification
            notificationName={"Note Deleted"}
            notificationColor={"rgba(224, 67, 83, 0.8)"}
          />
        )}
      </Container>
    </div>
  ) : (
    "Loading..."
  );
};

export default NotesContainer;
