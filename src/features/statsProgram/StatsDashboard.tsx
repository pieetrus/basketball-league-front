import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import ActionLog from "./ActionLog";
import EventPanel from "./EventPanel";
import PlayersInGamePanel from "./PlayersInGamePanel";
import StatsHeader from "./StatsHeader";

const StatsDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadIncidents } = rootStore.statsStore;
  useEffect(() => {
    loadIncidents();
  }, [loadIncidents]);
  return (
    <Grid centered>
      <StatsHeader />
      <PlayersInGamePanel />
      <GridColumn width={4} floated="left">
        <EventPanel isGuest={false} />
      </GridColumn>
      <GridColumn width={8}>
        <ActionLog />
      </GridColumn>
      <GridColumn width={4} floated="right">
        <EventPanel isGuest={true} />
      </GridColumn>
    </Grid>
  );
};

export default observer(StatsDashboard);
