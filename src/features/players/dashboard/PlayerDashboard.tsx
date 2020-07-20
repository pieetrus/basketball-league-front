import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import PlayerList from "../dashboard/PlayerList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import PlayerStore from "../../../app/stores/playerStore";

const PlayerDashboard: React.FC = () => {
  const playerStore = useContext(PlayerStore);

  useEffect(() => {
    playerStore.loadPlayers();
  }, [playerStore]);

  if (playerStore.loadingInitial)
    return <LoadingComponent content="Loading players..." />;
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
