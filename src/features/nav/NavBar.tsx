import React from "react";
import { Menu } from "semantic-ui-react";

function NavBar() {
  return (
    <Menu fixed="top" inverted>
      <Menu.Item header>
        <img
          src="assets/logo-dalk.png"
          alt="logo"
          style={{ marginRight: 20, marginLeft: 30 }}
        />
        DALK
      </Menu.Item>
      <Menu.Item name="NEWS" />
      <Menu.Item name="SCHEDULE" />
      <Menu.Item name="TEAMS" />
      <Menu.Item name="PLAYERS" />
      <Menu.Item name="TABLES" />
      <Menu.Item name="STATS" />
      <Menu.Item name="CONTACT" />
      <Menu.Menu position="right">
        <Menu.Item name="MANAGE" />
        <Menu.Item>
          <img src="assets/player-icon.png" alt="logo" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default NavBar;
