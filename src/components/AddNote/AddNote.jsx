import React, { useState, useEffect } from "react";

import ShowNotification from "../ShowNotification/ShowNotification";

import "./AddNote.scss";

import axios from "axios";

const AddNote = ({ onAdd, titleValue, bodyValue, colorHex, colorName }) => {
  const [createNotification, setCreateNotification] = useState(false);

  useEffect(() => {
    let showCreateNotification = setTimeout(
      () => setCreateNotification(false),
      3000
    );

    return () => {
      clearTimeout(showCreateNotification);
    };
  }, [createNotification]);

  const showCreateNotification = () => {
    setCreateNotification((createNotification) => !createNotification);
  };

  const addNote = () => {
    if (!titleValue) {
      alert("Введите название списка");
      return;
    }
    axios
      .post("http://localhost:3001/notes", {
        title: titleValue,
        body: bodyValue,
        colorHex: colorHex,
      })
      .then(({ data }) => {
        const listObj = { ...data };
        onAdd(listObj);
      })
      .catch(() => {
        alert("Ошибка при добавлении списка!");
      });
    axios.patch("http://localhost:3001/selectedColor/1", {
      hex: colorHex,
      colorName: colorName,
    });
  };

  return (
    <div className="create-note-button-field">
      <button
        className="create-note-button"
        onClick={() => {
          addNote();
          showCreateNotification();
        }}
      >
        Create Note
      </button>
      {createNotification && (
        <ShowNotification
          notificationName={"Note Created"}
          notificationColor={"rgba(0, 225, 60, 0.8)"}
        />
      )}
    </div>
  );
};

export default AddNote;
