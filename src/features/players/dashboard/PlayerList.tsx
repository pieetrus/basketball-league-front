import React from "react";
import { Item, Button, Segment, Label } from "semantic-ui-react";
import { IPlayer } from "../../../app/models/player";

interface IProps {
  players: IPlayer[];
  selectPlayer: (id: number) => void;
  deletePlayer: (id: number) => void;
}

const ActivityList: React.FC<IProps> = ({
  players,
  selectPlayer,
  deletePlayer,
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {players.map((player) => (
          <Item key={player.id}>
            <Item.Content>
              <Item.Header as="a">
                {player.name} {player.surname}
              </Item.Header>
              <Item.Description>
                <div>{player.birthdate}</div>
                <div>{player.height} cm</div>
              </Item.Description>
              <Item.Extra>
                <Label basic content={player.position} />
              </Item.Extra>
              <Item.Extra>
                <Button
                  onClick={() => selectPlayer(player.id)}
                  floated="right"
                  color="blue"
                  content="View"
                />
                <Button
                  onClick={() => deletePlayer(player.id)}
                  floated="right"
                  color="red"
                  content="Delete"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;
