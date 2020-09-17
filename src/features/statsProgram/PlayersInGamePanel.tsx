import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";

const PlayersInGamePanel = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    playerChosen,
    setPlayerChosen: setplayerChosen,
    getChosenPlayerJerseyColor,
    teamGuestJerseyColor,
    teamHomeJerseyColor,
    getChosenTeamHomePlayers: teamHomePlayers,
    getChosenTeamGuestPlayers: teamGuestPlayers,
  } = rootStore.statsStore;

  return (
    <Grid.Row>
      <Grid.Column width={2}>
        <Button content="Sub" color="instagram" size={"large"} />
        <Button content="Bench" color="instagram" style={{ marginTop: 10 }} />
        <Button content="Coach" color="instagram" style={{ marginTop: 10 }} />
      </Grid.Column>
      {teamHomePlayers &&
        teamHomePlayers!
          .slice(0, 5) // todo remove it and add strating 5 functionality
          .map((player) => (
            <Grid.Column key={player.id} width={1} textAlign="center">
              <Button
                toggle
                style={{ width: 50, height: 50, fontSize: 17, color: "black" }}
                color={teamHomeJerseyColor}
                inverted
                content={player.jerseyNr}
                clearing="true"
                onClick={() => {
                  setplayerChosen(player, false);
                }}
                compact
              />
            </Grid.Column>
          ))}
      <Grid.Column width={1} textAlign="center">
        {playerChosen && (
          <Segment
            compact
            inverted
            style={{ height: 35, width: 35, marginTop: 60, cursor: "pointer" }}
            content={playerChosen.jerseyNr}
            color={getChosenPlayerJerseyColor}
            onClick={() => setplayerChosen(undefined, false)}
          ></Segment>
        )}
      </Grid.Column>
      {teamGuestPlayers &&
        teamGuestPlayers!
          .slice(0, 5) // todo remove it and add strating 5 functionality
          .map((player) => (
            <Grid.Column key={player.id} width={1} textAlign="center">
              <Button
                toggle
                style={{ width: 50, height: 50, fontSize: 17, color: "black" }}
                color={teamGuestJerseyColor}
                inverted
                content={player.jerseyNr}
                clearing="true"
                onClick={() => {
                  setplayerChosen(player, true);
                }}
                compact
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
        <Button
          content="Coach"
          color="instagram"
          floated="right"
          style={{ marginTop: 10 }}
        />
      </Grid.Column>
    </Grid.Row>
  );
};

export default observer(PlayersInGamePanel);
