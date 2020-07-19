import React, { useEffect, useState, SyntheticEvent, useContext } from "react";
import { Container, Button, Grid, GridColumn } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import PlayerDashboard from "../../features/players/dashboard/PlayerDashboard";
import { IPlayer } from "../models/player";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import PlayerStore from "../stores/playerStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const playerStore = useContext(PlayerStore);
  const { openCreateForm } = playerStore;
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState(0);

  const handleEditPlayer = (player: IPlayer) => {
    setSubmitting(true);
    agent.Players.update(player)
      .then(() => {
        setPlayers([...players.filter((p) => p.id !== player.id), player]);
        setSelectedPlayer(player);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeletePlayer = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    setSubmitting(true);
    setTarget(Number(event.currentTarget.name));
    agent.Players.delete(id)
      .then(() => {
        setPlayers([...players.filter((p) => p.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

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
        <PlayerDashboard
          setEditMode={setEditMode}
          editPlayer={handleEditPlayer}
          deletePlayer={handleDeletePlayer}
          submitting={submitting}
          target={target}
        />
      </Container>
    </>
  );
};

export default observer(App);
