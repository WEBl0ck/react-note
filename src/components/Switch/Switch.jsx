import React from "react";

import "./Switch.scss";

const Switch = ({ isChecked, switchHandler }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          switchHandler();
        }}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default Switch;
