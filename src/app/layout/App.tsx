import React, { useEffect, useState } from "react";
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

  const handleSelectPlayer = (id: number) => {
    setSelectedPlayer(players.filter((p) => p.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedPlayer(null);
    setEditMode(true);
  };

  const handleCreatePlayer = (player: IPlayer) => {
    agent.Players.create(player).then((id: number) => {
      let createdPlayer = {
        ...player,
        id,
      };
      setPlayers([...players, createdPlayer]);
      setSelectedPlayer(createdPlayer);
      setEditMode(false);
    });
  };

  const handleEditPlayer = (player: IPlayer) => {
    agent.Players.update(player).then(() => {
      setPlayers([...players.filter((p) => p.id !== player.id), player]);
      setSelectedPlayer(player);
      setEditMode(false);
    });
  };

  const handleDeletePlayer = (id: number) => {
    agent.Players.delete(id).then(() => {
      setPlayers([...players.filter((p) => p.id !== id)]);
    });
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

  if (loading) return <LoadingComponent />;

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
        />
      </Container>
    </>
  );
};

export default App;
