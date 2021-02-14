import React, { useState } from "react";

import "./AddNote.scss";

import axios from "axios";

const AddNote = ({ onAdd, titleValue, bodyValue, colors }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, selectColor] = useState(3);

  const addNote = () => {
    if (!titleValue) {
      alert("Введите название списка");
      return;
    }
    setIsLoading(true);
    axios
      .post("http://localhost:3001/notes", {
        title: titleValue,
        body: bodyValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0];
        const listObj = { ...data };
        onAdd(listObj);
      })
      .catch(() => {
        alert("Ошибка при добавлении списка!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="create-note-button-field">
      <button className="create-note-button" onClick={addNote}>
        Create Note
      </button>
    </div>
  );
};

export default AddNote;
