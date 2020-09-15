import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { IPlayerShortInfo } from "../../app/models/matchDetailed";

const PlayersInGamePanel: React.FC<{
  teamHomePlayers: IPlayerShortInfo[];
  teamGuestPlayers: IPlayerShortInfo[];
}> = ({ teamHomePlayers, teamGuestPlayers }) => {
  return (
    <Grid.Row>
      <Grid.Column width={2}>
        <Button content="Sub" color="instagram" size={"large"} />
        <Button content="Bench" color="instagram" style={{ marginTop: 10 }} />
      </Grid.Column>
      {teamHomePlayers!.slice(0, 5).map((player) => (
        <Grid.Column key={player.id} width={1} textAlign="center">
          <Button
            style={{ width: 50, height: 50, fontSize: 17 }}
            color="green"
            inverted
            content={player.jerseyNr}
            clearing="true"
          />
        </Grid.Column>
      ))}
      <Grid.Column width={2} />
      {teamGuestPlayers!.slice(0, 5).map((player) => (
        <Grid.Column key={player.id} width={1} textAlign="center">
          <Button
            style={{ width: 50, height: 50, fontSize: 17 }}
            color="pink"
            inverted
            content={player.jerseyNr}
            clearing="true"
          />
        </Grid.Column>
      ))}
      <Grid.Column width={2}>
        <Button
          content="Sub"
          color="instagram"
          size={"large"}
          floated="right"
        />
        <Button
          content="Bench"
          color="instagram"
          floated="right"
          style={{ marginTop: 10 }}
        />
      </Grid.Column>
    </Grid.Row>
  );
};

export default observer(PlayersInGamePanel);
