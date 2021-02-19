import React from "react";
import classNames from "classnames";

const LeftArrowButton = ({ changeSidebar, sidebarToogle }) => {
  return (
    <div
      className={classNames(
        "left-sidebar-icon",
        sidebarToogle && "left-sidebar-icon-active"
      )}
      onClick={changeSidebar}
    >
      <svg x="0px" y="0px" width="33" height="32" viewBox="0 0 792.033 792.033">
        <g>
          <g id="_x38_">
            <g>
              <path
                d="M617.858,370.896L221.513,9.705c-13.006-12.94-34.099-12.94-47.105,0c-13.006,12.939-13.006,33.934,0,46.874
				l372.447,339.438L174.441,735.454c-13.006,12.94-13.006,33.935,0,46.874s34.099,12.939,47.104,0l396.346-361.191
				c6.932-6.898,9.904-16.043,9.441-25.087C627.763,386.972,624.792,377.828,617.858,370.896z"
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

export default LeftArrowButton;
