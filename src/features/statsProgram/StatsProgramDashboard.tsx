import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid, GridColumn } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import ActionLog from "./ActionLog";
import EventPanel from "./EventPanel";
import FoulsAndTimeoutsPanel from "./FoulsAndTimeoutsPanel";
import PlayersInGamePanel from "./PlayersInGamePanel";
import StatsHeader from "./StatsHeader";

interface DetailParams {
  id: string;
}

const StatsProgramDashboard: React.FC<RouteComponentProps<DetailParams>> = ({
  match: match2,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadIncidents,
    match,
    createHubConnection,
    stopHubConnection,
  } = rootStore.statsProgramStore;

  useEffect(() => {
    loadIncidents(match!.id!);
    createHubConnection();
    return () => {
      stopHubConnection();
    };
  }, [loadIncidents, match, createHubConnection, stopHubConnection]);
  return (
    <Grid centered>
      <StatsHeader />
      <PlayersInGamePanel />
      <FoulsAndTimeoutsPanel />
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

export default observer(StatsProgramDashboard);
