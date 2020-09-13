import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Segment, Grid, GridColumn, GridRow } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import StatsHeader from "./StatsHeader";

const StatsDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { teamGuestPlayers, teamHomePlayers } = rootStore.statsStore;

  function getActualTime(val: any) {
    console.log(val); // prototype only to get data from timer
  }

  return (
    <Fragment>
      <Grid centered>
        <GridColumn width={16}>
          <StatsHeader getData={getActualTime} />
        </GridColumn>
        <GridRow>
          {teamHomePlayers!.map((player) => (
            <GridColumn key={player.id} floated="left">
              <Segment style={{ width: 50, height: 50 }} textAlign="center">
                {player.jerseyNr}
              </Segment>
            </GridColumn>
          ))}
          {teamGuestPlayers!.map((player) => (
            <GridColumn key={player.id} floated="right">
              <Segment style={{ width: 50, height: 50 }} textAlign="center">
                {player.jerseyNr}
              </Segment>
            </GridColumn>
          ))}
        </GridRow>
      </Grid>
    </Fragment>
  );
};

export default observer(StatsDashboard);
