import React, { useRef, useEffect } from "react";

import { ReactComponent as CancelIcon } from "../../assets/image/cancel.svg";

import Badge from "../Badge/Badge";

const ColorsPopup = ({ colors, popupToggle, selectedColor, changeColor }) => {
  useEffect(() => {
    document.addEventListener("mousedown", handleInsideClick, false);

    return () => {
      document.removeEventListener("mousedown", handleInsideClick, false);
    };
  });

  const node = useRef();

  const handleInsideClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    popupToggle();
  };

  return (
    <div className="add-note__popup-colors" ref={node}>
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
  );
};

export default ColorsPopup;
