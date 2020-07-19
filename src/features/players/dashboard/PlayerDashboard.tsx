import React, { SyntheticEvent, useContext } from "react";
import { Grid } from "semantic-ui-react";
import { IPlayer } from "../../../app/models/player";
import PlayerList from "../dashboard/PlayerList";
import PlayerDetails from "../details/PlayerDetails";
import PlayerForm from "../form/PlayerForm";
import { observer } from "mobx-react-lite";
import PlayerStore from "../../../app/stores/playerStore";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  editPlayer: (player: IPlayer) => void;
  deletePlayer: (event: SyntheticEvent<HTMLButtonElement>, id: number) => void;
  submitting: boolean;
  target: number;
}

const PlayerDashboard: React.FC<IProps> = ({
  setEditMode,
  editPlayer,
  deletePlayer,
  submitting,
  target,
}) => {
  const playerStore = useContext(PlayerStore);
  const { editMode, selectedPlayer } = playerStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <PlayerList
          deletePlayer={deletePlayer}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedPlayer && !editMode && <PlayerDetails />}
        {editMode && (
          <PlayerForm
            key={(selectedPlayer && selectedPlayer.id) || 0}
            setEditMode={setEditMode}
            player={selectedPlayer!}
            editPlayer={editPlayer}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(PlayerDashboard);
