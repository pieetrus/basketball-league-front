import React, { useEffect, useState, SyntheticEvent } from "react";
import { Container, Button, Grid, GridColumn } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import PlayerDashboard from "../../features/players/dashboard/PlayerDashboard";
import { IPlayer } from "../models/player";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

const App = () => {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState(0);

  const handleSelectPlayer = (id: number) => {
    setSelectedPlayer(players.filter((p) => p.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedPlayer(null);
    setEditMode(true);
  };

  const handleCreatePlayer = (player: IPlayer) => {
    setSubmitting(true);
    agent.Players.create(player)
      .then((id: number) => {
        let createdPlayer = {
          ...player,
          id,
        };
        setPlayers([...players, createdPlayer]);
        setSelectedPlayer(createdPlayer);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

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
    agent.Players.list()
      .then((response) => {
        let players: IPlayer[] = [];
        response.forEach((player) => {
          player.birthdate = player.birthdate.split("T")[0];
          players.push(player);
        });
        setPlayers(players);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content="Loading players..." />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Grid>
          <GridColumn>
            <Button
              onClick={handleOpenCreateForm}
              color="green"
              content="Add Player"
              size="large"
            />
          </GridColumn>
        </Grid>
      </Container>
      <Container style={{ marginTop: "2em" }}>
        <PlayerDashboard
          players={players}
          selectPlayer={handleSelectPlayer}
          selectedPlayer={selectedPlayer}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedPlayer={setSelectedPlayer}
          createPlayer={handleCreatePlayer}
          editPlayer={handleEditPlayer}
          deletePlayer={handleDeletePlayer}
          submitting={submitting}
          target={target}
        />
      </Container>
    </>
  );
};

export default App;
