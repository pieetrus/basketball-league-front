import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";

const FoulsAndTimeoutsPanel = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    teamGuestFouls,
    teamHomeFouls,
    teamHomeTimeoutsUsed,
    teamGuestTimeoutsUsed,
  } = rootStore.statsStore;

  return (
    <Grid.Row>
      <Grid.Column floated="left" width={3}>
        <Segment.Group>
          <Segment>{"TIMEOUTS: " + (3 - teamHomeTimeoutsUsed)}</Segment>
        </Segment.Group>
      </Grid.Column>
      <Grid.Column floated="left" width={2}>
        <Segment>{"FOULS: " + teamHomeFouls}</Segment>
      </Grid.Column>
      <Grid.Column floated="right" width={2}>
        <Segment>{"FOULS: " + teamGuestFouls}</Segment>
      </Grid.Column>
      <Grid.Column floated="right" width={3}>
        <Segment>{"TIMEOUTS: " + (3 - teamGuestTimeoutsUsed)}</Segment>
      </Grid.Column>
    </Grid.Row>
  );
};

export default observer(FoulsAndTimeoutsPanel);
