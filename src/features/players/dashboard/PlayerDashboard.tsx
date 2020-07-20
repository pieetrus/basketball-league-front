import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import PlayerList from "../dashboard/PlayerList";
import PlayerDetails from "../details/PlayerDetails";
import PlayerForm from "../form/PlayerForm";
import { observer } from "mobx-react-lite";
import PlayerStore from "../../../app/stores/playerStore";

const PlayerDashboard: React.FC = () => {
  const playerStore = useContext(PlayerStore);
  const { editMode, selectedPlayer } = playerStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <PlayerList />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedPlayer && !editMode && <PlayerDetails />}
        {editMode && (
          <PlayerForm
            key={(selectedPlayer && selectedPlayer.id) || 0}
            player={selectedPlayer!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(PlayerDashboard);
