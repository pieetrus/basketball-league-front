import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IPlayer } from "../../../app/models/player";

interface IProps {
  player: IPlayer;
  setEditMode: (editMode: boolean) => void;
  setSelectedPlayer: (player: IPlayer | null) => void;
}

const PlayerDetails: React.FC<IProps> = ({
  player,
  setEditMode,
  setSelectedPlayer,
}) => {
  return (
    <Card fluid>
      <Image src="/assets/player-icon.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          {player.name} {player.surname}
        </Card.Header>
        <Card.Meta>
          <span>{player.position}</span>
        </Card.Meta>
        <Card.Description>{player.birthdate}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => setSelectedPlayer(null)}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default PlayerDetails;
