import React, { useEffect, useContext } from "react";
import { Container, Button, Grid, GridColumn } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import PlayerDashboard from "../../features/players/dashboard/PlayerDashboard";
import LoadingComponent from "./LoadingComponent";
import PlayerStore from "../stores/playerStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const playerStore = useContext(PlayerStore);
  const { openCreateForm } = playerStore;

  useEffect(() => {
    playerStore.loadPlayers();
  }, [playerStore]);

  if (playerStore.loadingInitial)
    return <LoadingComponent content="Loading players..." />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Grid>
          <GridColumn>
            <Button
              onClick={openCreateForm}
              color="green"
              content="Add Player"
              size="large"
            />
          </GridColumn>
        </Grid>
      </Container>
      <Container style={{ marginTop: "2em" }}>
        <PlayerDashboard />
      </Container>
    </>
  );
};

export default observer(App);
