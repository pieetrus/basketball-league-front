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
    quater,
  } = rootStore.statsStore;

  return (
    <Grid.Row>
      <Grid.Column floated="left" width={3}>
        <Segment.Group>
          {(quater === 1 || quater === 2) && (
            <Segment>{"TIMEOUTS: " + (2 - teamHomeTimeoutsUsed)}</Segment>
          )}
          {(quater === 3 || quater === 4) && (
            <Segment>{"TIMEOUTS: " + (3 - teamHomeTimeoutsUsed)}</Segment>
          )}
        </Segment.Group>
      </Grid.Column>
      <Grid.Column floated="left" width={2}>
        <Segment>{"FOULS: " + teamHomeFouls}</Segment>
      </Grid.Column>
      <Grid.Column floated="right" width={2}>
        <Segment>{"FOULS: " + teamGuestFouls}</Segment>
      </Grid.Column>
      <Grid.Column floated="right" width={3}>
        {(quater === 1 || quater === 2) && (
          <Segment>{"TIMEOUTS: " + (2 - teamGuestTimeoutsUsed)}</Segment>
        )}
        {(quater === 3 || quater === 4) && (
          <Segment>{"TIMEOUTS: " + (3 - teamGuestTimeoutsUsed)}</Segment>
        )}
      </Grid.Column>
    </Grid.Row>
  );
};

export default observer(FoulsAndTimeoutsPanel);
