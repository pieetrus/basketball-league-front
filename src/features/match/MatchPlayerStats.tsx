import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import PlayerMatchTable from "./PlayerMatchTable";

const MatchPlayerStats: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    selectedMatch,
    homePlayerMatches,
    guestPlayerMatches,
  } = rootStore.matchStore;

  return (
    <Fragment>
      <Grid>
        <Grid.Row>
          <Image
            src={selectedMatch?.teamHome.logoUrl}
            avatar
            size="mini"
            style={{ marginRight: 25, marginLeft: 30, marginTop: 5 }}
          />
          <Header content={selectedMatch?.teamHome.name} />
        </Grid.Row>
        <Grid.Row>
          <PlayerMatchTable playerMatches={homePlayerMatches} />
        </Grid.Row>
        <Grid.Row>
          <Image
            src={selectedMatch?.teamGuest.logoUrl}
            avatar
            size="mini"
            style={{ marginRight: 25, marginLeft: 30, marginTop: 5 }}
          />
          <Header content={selectedMatch?.teamGuest.name} />
        </Grid.Row>
        <Grid.Row>
          <PlayerMatchTable playerMatches={guestPlayerMatches} />
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default observer(MatchPlayerStats);
