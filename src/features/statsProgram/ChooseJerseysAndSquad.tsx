import React, { Fragment, useContext } from "react";
import { Segment, Grid, Divider } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const ChooseJerseysAndSquad: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  const { selectedMatch: match } = rootStore.matchStore;
  return (
    <Fragment>
      <Segment>
        <Grid columns={2}>
          <Grid.Column>
            {match?.id}
            <p>Choose team color</p>
            <p>tutaj widget do wybierania koloru stroju</p>
          </Grid.Column>
          <Grid.Column>
            {match?.id}
            <p>Choose team color</p>
            <p>tutaj widget do wybierania koloru stroju</p>
          </Grid.Column>
        </Grid>
        <Divider vertical />
      </Segment>
    </Fragment>
  );
};

export default observer(ChooseJerseysAndSquad);
