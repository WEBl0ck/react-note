import React from "react";
import classNames from "classnames";

const RightArrowButton = ({ changeRightSidebar, rightSidebarToogle }) => {
  return (
    <div
      className={classNames(
        "right-sidebar-icon",
        rightSidebarToogle && "right-sidebar-icon-active"
      )}
      onClick={changeRightSidebar}
    >
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="33"
        height="32"
        viewBox="0 0 791.966 791.967"
      >
        <g>
          <g id="_x37_">
            <g>
              <path
                d="M245.454,396.017L617.077,56.579c12.973-12.94,12.973-33.934,0-46.874c-12.973-12.94-34.033-12.94-47.006,0
				L174.615,370.896c-6.932,6.899-9.87,16.076-9.408,25.087c-0.462,9.045,2.476,18.188,9.408,25.088l395.456,361.19
				c12.973,12.94,34.033,12.94,47.006,0c12.973-12.939,12.973-33.934,0-46.873L245.454,396.017z"
              />
            </g>
          </g>
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    </div>
  );
};

export default RightArrowButton;
