import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import PlayerStore from "../../../app/stores/playerStore";

const PlayerDetails: React.FC = () => {
  const playerStore = useContext(PlayerStore);
  const { selectedPlayer: player, selectPlayer } = playerStore;
  return (
    <Card fluid>
      <Image src="/assets/player-icon.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          {player!.name} {player!.surname}
        </Card.Header>
        <Card.Meta>
          <span>{player!.position}</span>
        </Card.Meta>
        <Card.Description>{player!.birthdate}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => selectPlayer(0)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => selectPlayer(0)}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(PlayerDetails);
