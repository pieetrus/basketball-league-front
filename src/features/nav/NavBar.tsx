import React, { useContext } from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

function NavBar() {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <Menu fixed="top" inverted>
      <Menu.Item header as={NavLink} exact to="/">
        <img
          src="../assets/logo-dalk.png"
          alt="logo"
          style={{ marginRight: 20, marginLeft: 30 }}
        />
        DALK
      </Menu.Item>
      <Menu.Item name="STATS_PROGRAM" as={NavLink} to="/statsProgram" />
      <Menu.Item name="PLAYERS" as={NavLink} to="/players" />
      <Menu.Item name="CREATE PLAYER" as={NavLink} to="/createPlayer" />
      <Menu.Item name="NEWS" />
      <Menu.Item name="SCHEDULE" />
      <Menu.Item name="TEAMS" />
      <Menu.Item name="TABLES" />
      <Menu.Item name="STATS" />
      <Menu.Item name="CONTACT" />
      {/* <Menu.Menu position="right">
        <Menu.Item name="MANAGE" />
        <Menu.Item>
          <img src="../assets/player-icon.png" alt="logo" />
        </Menu.Item>
      </Menu.Menu> */}
      {user && (
        <Menu.Menu position="right">
          <Menu.Item>
            <Image
              avatar
              spaced="right"
              src={user.image || "../assets/player-icon.png"}
            />
            <Dropdown pointing="top" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.username}`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
}

export default observer(NavBar);
