import React from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";

const panes = [
  { menuItem: "About", render: () => <Tab.Pane>About content</Tab.Pane> },
  { menuItem: "Photos", render: () => <ProfilePhotos /> },
  {
    menuItem: "Teams",
    render: () => <Tab.Pane>Teams content</Tab.Pane>,
  },
  {
    menuItem: "Stats",
    render: () => <Tab.Pane>Stats content</Tab.Pane>,
  },
  {
    menuItem: "Records",
    render: () => <Tab.Pane>Records content</Tab.Pane>,
  },
];

const ProfileContent = () => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      activeIndex={1}
    />
  );
};

export default ProfileContent;
