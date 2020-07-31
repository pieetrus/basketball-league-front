import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import PlayerList from "../dashboard/PlayerList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";

const PlayerDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadPlayers, loadingInitial } = rootStore.playerStore;

  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);

  if (loadingInitial) return <LoadingComponent content="Loading players..." />;
  return (
    <>
      <Grid>
        <Grid.Column width={10}>
          <PlayerList />
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Coś tu bydzie</h2>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default observer(PlayerDashboard);
