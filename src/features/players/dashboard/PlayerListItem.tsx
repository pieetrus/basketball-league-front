import React, { Fragment } from "react";
import { Item, Button, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IPlayer } from "../../../app/models/player";
import { observer } from "mobx-react-lite";

const PlayerListItem: React.FC<{ player: IPlayer }> = ({ player }) => {
  return (
    <>
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Image
              style={{ marginRight: "30px" }}
              size="tiny"
              circular
              src="../assets/user-icon2.png"
            />
            <Item.Content
              style={{
                fontSize: "20px",
                color: "black",
              }}
              as={Link}
              to={`/players/${player.id}`}
            >
              {player.name} {player.surname}
            </Item.Content>
          </Item.Content>
        </Item>
      </Item.Group>
    </>
  );
};

export default observer(PlayerListItem);
