import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const ManagerNavBar = () => {
  return (
    <Menu inverted style={{ marginTop: 50 }} color="blue">
      <Menu.Item name="CREATE PLAYER" as={NavLink} to="/manager/createPlayer" />
      <Menu.Item name="CREATE TEAM" as={NavLink} to="/manager/createTeam" />
      <Menu.Item name="SEASON" as={NavLink} to="/manager/season" />
      <Menu.Item name="DIVISION" as={NavLink} to="/manager/division" />
    </Menu>
  );
};

export default ManagerNavBar;
