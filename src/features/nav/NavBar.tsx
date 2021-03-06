import React, { useContext } from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { AdminRole } from "../../app/common/global";

function NavBar() {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <Menu fixed="top" inverted>
      <Menu.Item header as={NavLink} exact to="/">
        <img
          src="../assets/logo.png"
          alt="logo"
          style={{ marginRight: 20, marginLeft: 30, height: 40, width: "auto" }}
        />
        Basketball League
      </Menu.Item>
      {user?.role === AdminRole && (
        <Menu.Item name="MANAGE" as={NavLink} to="/manager" />
      )}
      {user?.role === AdminRole && (
        <Menu.Item name="MATCH MANAGER" as={NavLink} to="/matchManager" />
      )}
      {/* <Menu.Item name="NEWS" as={NavLink} to="/news" /> */}
      <Menu.Item name="TABLES" as={NavLink} to="/tables" />
      <Menu.Item name="SCHEDULE" as={NavLink} to="/schedule" />
      <Menu.Item name="STATS" as={NavLink} to="/stats" />
      <Menu.Item name="PLAYERS" as={NavLink} to="/players" />
      <Menu.Item name="TEAMS" as={NavLink} to="/teams" />
      <Menu.Item name="CONTACT" as={NavLink} to="/contact" />
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
