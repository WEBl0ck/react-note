import React from "react";
import { ReactComponent as CheckedIcon } from "../../assets/image/checked.svg";

import "./ShowNotification.scss";

const ShowNotification = ({ notificationName, notificationColor }) => {
  return (
    <div
      className="note-notification"
      style={{ backgroundColor: notificationColor }}
    >
      {notificationName}{" "}
      <CheckedIcon
        className="note-notification-icon"
        width="22"
        height="22"
        fill="#fff"
      />
    </div>
  );
};

export default ShowNotification;
