import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ActionLog from "./ActionLog";
import EventPanel from "./EventPanel";
import PlayersInGamePanel from "./PlayersInGamePanel";
import StatsHeader from "./StatsHeader";

const StatsDashboard = () => {
  return (
    <Grid centered>
      <StatsHeader />
      <PlayersInGamePanel />
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
