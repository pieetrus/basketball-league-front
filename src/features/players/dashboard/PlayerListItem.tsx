import React from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IPlayer } from "../../../app/models/player";
import { observer } from "mobx-react-lite";

const PlayerListItem: React.FC<{ player: IPlayer }> = ({ player }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="../assets/user-icon2.png" />
            <Item.Content>
              <Item.Header as="a">
                {player.name} {player.surname}
              </Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" /> {player.birthdate}
        <Icon name="marker" /> {player.position}
      </Segment>
      <Segment secondary>Attentees will go here</Segment>
      <Segment clearing>
        <span>{player.height} cm</span>
        <Button
          as={Link}
          to={`/players/${player.id}`}
          floated="right"
          color="blue"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
};

export default observer(PlayerListItem);
