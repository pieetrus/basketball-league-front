import React, { useContext, Fragment } from "react";
import { Item, Segment, Label } from "semantic-ui-react";
import PlayerStore from "../../../app/stores/playerStore";
import { observer } from "mobx-react-lite";
import PlayerListItem from "./PlayerListItem";

const ActivityList: React.FC = () => {
  const playerStore = useContext(PlayerStore);
  const { playersBySurname } = playerStore;
  return (
    <Fragment>
      {playersBySurname.map(([group, players]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {group}
          </Label>
          <Segment clearing>
            <Item.Group divided>
              {players.map((player) => (
                <PlayerListItem key={player.id} player={player} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(ActivityList);
