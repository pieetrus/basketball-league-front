import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import PlayerStore from "../../../app/stores/playerStore";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface DetailParams {
  id: string;
}

const PlayerDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const playerStore = useContext(PlayerStore);
  const { player, loadPlayer, loadingInitial } = playerStore;

  useEffect(() => {
    loadPlayer(Number.parseInt(match.params.id));
  }, [loadPlayer, match.params.id]);

  if (loadingInitial || !player)
    return <LoadingComponent content="Loading player..." />;

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
            as={Link}
            to={`/manage/${player.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push("/players")}
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
