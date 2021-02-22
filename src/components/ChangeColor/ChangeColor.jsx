import React, { useState } from "react";

import "./ChangeColor.scss";

import Badge from "../Badge/Badge";
import ColorsPopup from "../ColorsPopup/ColorsPopup";

const ChangeColor = ({ colors, changeColor, selectedColor, colorName }) => {
  const [isOpened, setIsOpened] = useState(false);

  const popupToggle = (e) => {
    setIsOpened((isOpened) => !isOpened);
  };

  return (
    <React.Fragment>
      <div className="add-note add-note__button-container">
        <div className="add-note__info-popup">Change note color</div>
        <Badge
          color={colorName}
          className="add-note__button"
          onClick={popupToggle}
        />
      </div>
      {isOpened && (
        <ColorsPopup
          colors={colors}
          popupToggle={popupToggle}
          changeColor={changeColor}
          selectedColor={selectedColor}
        />
      )}
    </React.Fragment>
  );
};

export default ChangeColor;
