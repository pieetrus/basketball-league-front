import React, { SyntheticEvent, useContext } from "react";
import { Item, Button, Segment, Label } from "semantic-ui-react";
import PlayerStore from "../../../app/stores/playerStore";
import { observer } from "mobx-react-lite";

interface IProps {
  deletePlayer: (event: SyntheticEvent<HTMLButtonElement>, id: number) => void;
  target: number;
  submitting: boolean;
}

const ActivityList: React.FC<IProps> = ({
  deletePlayer,
  submitting,
  target,
}) => {
  const playerStore = useContext(PlayerStore);
  const { players, selectPlayer } = playerStore;
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
                  name={player.id}
                  onClick={(e) => deletePlayer(e, player.id)}
                  floated="right"
                  color="red"
                  content="Delete"
                  loading={target === player.id && submitting}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
