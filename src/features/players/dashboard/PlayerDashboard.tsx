import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { IPlayer } from "../../../app/models/player";
import PlayerList from "../dashboard/PlayerList";
import PlayerDetails from "../details/PlayerDetails";
import PlayerForm from "../form/PlayerForm";

interface IProps {
  players: IPlayer[];
  selectPlayer: (id: number) => void;
  selectedPlayer: IPlayer | null;
  setEditMode: (editMode: boolean) => void;
  editMode: boolean;
  setSelectedPlayer: (player: IPlayer | null) => void;
  createPlayer: (player: IPlayer) => void;
  editPlayer: (player: IPlayer) => void;
  deletePlayer: (event: SyntheticEvent<HTMLButtonElement>, id: number) => void;
  submitting: boolean;
  target: number;
}

const PlayerDashboard: React.FC<IProps> = ({
  players,
  selectPlayer,
  selectedPlayer,
  setEditMode,
  editMode,
  setSelectedPlayer,
  createPlayer,
  editPlayer,
  deletePlayer,
  submitting,
  target,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <PlayerList
          players={players}
          selectPlayer={selectPlayer}
          deletePlayer={deletePlayer}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedPlayer && !editMode && (
          <PlayerDetails
            player={selectedPlayer}
            setEditMode={setEditMode}
            setSelectedPlayer={setSelectedPlayer}
          />
        )}
        {editMode && (
          <PlayerForm
            key={(selectedPlayer && selectedPlayer.id) || 0}
            setEditMode={setEditMode}
            player={selectedPlayer!}
            createPlayer={createPlayer}
            editPlayer={editPlayer}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default PlayerDashboard;
