import React, { useEffect, useState } from "react";
import axios from "axios";

import SettingsItem from "../SettingsItem/SettingsItem";

import "./GeneralSettings.scss";

const GeneralSettings = ({ toggleTheme }) => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    axios.get("/settings/").then(({ data }) => {
      setSettings(data);
    });
  }, []);

  const changeTheme = (isChecked, settingId) => {
    if (settingId === 1) {
      toggleTheme(isChecked);
    }
  };

  return (
    <React.Fragment>
      {settings ? (
        settings.map((setting) => (
          <SettingsItem
            key={setting.id}
            settingName={setting.settingName}
            settingId={setting.id}
            settingValue={setting.settingValue}
            switcher={setting.switcher}
            dropdownValue={setting.dropdownValue}
            dropdownDefaultValue={setting.dropdownDefaultValue}
            changeTheme={changeTheme}
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </React.Fragment>
  );
};

export default GeneralSettings;
