import React from "react";

import "./Info.scss";

import { ReactComponent as ReactLogo } from "../../assets/image/github.svg";

const Info = () => {
  return (
    <div className="info-container">
      <code className="app-name">
        react-note <span>v1.0</span>
      </code>
      <h4 className="app-description">
        Application for creating small notes. Please use it for research
        purposes only, do not save personal information.
      </h4>
      <p className="app-creator">
        Created by{" "}
        <a href="https://github.com/WEBl0ck/react-note">
          Anton Tamazlukar <ReactLogo width="22" height="22" fill="#64c4ed" />
        </a>
      </p>
    </div>
  );
};

export default Info;
