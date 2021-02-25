import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";

import Switch from "../Switch/Switch";

import useDidUpdate from "../../hooks/useDidUpdate";

import "./SettingsItem.scss";

const SettingsItem = ({
  settingName,
  switcher,
  dropdownDefaultValue,
  dropdownValue,
  settingValue,
  settingId,
  changeTheme,
}) => {
  const [isChecked, setIsChecked] = useState(settingValue);
  const [defaultDropdown, setDefaultDropdown] = useState("");

  useDidUpdate(() => {
    axios.patch("http://localhost:3001/settings/" + settingId, {
      settingValue: isChecked,
    });
    changeTheme(isChecked, settingId);
  }, [isChecked]);

  useDidUpdate(() => {
    axios.patch("http://localhost:3001/settings/" + settingId, {
      dropdownDefaultValue: defaultDropdown,
    });
  }, [defaultDropdown]);

  const switchHandler = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  const dropdownHandler = (dropdownValue) => {
    setDefaultDropdown(dropdownValue);
  };

  return (
    <div className="general-settings-item">
      <div className="general-settings-item__name">{settingName}</div>
      <div className="general-settings-item__option">
        {switcher ? (
          <Switch isChecked={isChecked} switchHandler={switchHandler} />
        ) : (
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {defaultDropdown ? defaultDropdown : dropdownDefaultValue}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {dropdownValue.map((dropdownItem) => (
                <Dropdown.Item
                  onClick={() => {
                    dropdownHandler(dropdownItem.value);
                  }}
                  key={dropdownItem.id}
                >
                  {dropdownItem.value}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default SettingsItem;
