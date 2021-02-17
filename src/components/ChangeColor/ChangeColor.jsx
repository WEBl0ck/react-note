import React, { useState } from "react";

import { ReactComponent as CancelIcon } from "../../assets/image/cancel.svg";

import "./ChangeColor.scss";

import Badge from "../Badge/Badge";

const ChangeColor = ({ colors, changeColor, selectedColor, colorName }) => {
  const [isOpened, setIsOpened] = useState(false);

  const popupToggle = () => {
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
        <div className="add-note__popup-colors">
          {colors &&
            colors.map((color) => (
              <Badge
                onClick={() => changeColor(color)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"}
              />
            ))}
          <CancelIcon
            className="add-note__popup-close"
            height="18"
            width="18"
            onClick={popupToggle}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default ChangeColor;
