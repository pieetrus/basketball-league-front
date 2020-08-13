import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const ManagerNavBar = () => {
  return (
    <Menu inverted style={{ marginTop: 100 }} color="blue">
      {/* <Menu.Item name="PLAYERS" as={NavLink} to="/players" /> */}
      <Menu.Item name="CREATE PLAYER" as={NavLink} to="/manager/createPlayer" />
      {/* <Menu.Item name="TEAMS" as={NavLink} to="/teams" /> */}
      <Menu.Item name="CREATE TEAM" as={NavLink} to="/manager/createTeam" />
    </Menu>
  );
};

export default ManagerNavBar;
