import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import ActionLog from "./ActionLog";
import EventPanel from "./EventPanel";
import PlayersInGamePanel from "./PlayersInGamePanel";
import StatsHeader from "./StatsHeader";

const StatsDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { teamGuestPlayers, teamHomePlayers } = rootStore.statsStore;

  function getActualTime(val: any) {
    console.log(val); // prototype only to get data from timer
  }

  return (
    <Grid centered>
      <StatsHeader getData={getActualTime} />
      <PlayersInGamePanel
        teamGuestPlayers={teamGuestPlayers}
        teamHomePlayers={teamHomePlayers}
      />
      <GridColumn width={4} floated="left">
        <EventPanel />
      </GridColumn>
      <GridColumn width={8}>
        <ActionLog />
      </GridColumn>

      <GridColumn width={4} floated="right">
        <EventPanel />
      </GridColumn>
    </Grid>
  );
};

export default observer(StatsDashboard);
