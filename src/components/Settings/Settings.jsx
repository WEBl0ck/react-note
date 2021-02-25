import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import GeneralSettings from "../GeneralSettings/GeneralSettings";

import "./Settings.scss";

import { ReactComponent as HeartIcon } from "../../assets/image/heart.svg";

const Settings = ({ toggleTheme }) => {
  return (
    <Router>
      <div className="settings-container">
        <ul className="settings-list">
          <li className="setting-name">
            <Link to="/settings/general">General</Link>
          </li>
          <li className="setting-name">
            <Link to="/settings/editor">Editor</Link>
          </li>
          <li className="setting-name">
            <Link to="/settings/user-interface">UI</Link>
          </li>
        </ul>
        <div className="settings">
          <Switch>
            <Route exact path="/settings/general">
              <GeneralSettings toggleTheme={toggleTheme} />
            </Route>
            <Route path="/settings/editor">
              <div className="creating-message">
                I'm working on it <HeartIcon width="22" height="22" />
              </div>
            </Route>
            <Route exact path="/settings/user-interface">
              <div className="creating-message">
                I'm working on it <HeartIcon width="22" height="22" />
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Settings;
