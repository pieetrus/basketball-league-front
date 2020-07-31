import React, { useContext, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import PlayerDetailedHeader from "./PlayerDetailedHeader";
import PlayerDetailedInfo from "./PlayerDetailedInfo";
import PlayerDetailedChat from "./PlayerDetailedChat";
import PlayerDetailedSideBar from "./PlayerDetailedSideBar";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const PlayerDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { player, loadPlayer, loadingInitial } = rootStore.playerStore;

  useEffect(() => {
    let id = Number(match.params.id);
    if (isNaN(id)) {
      id = -1;
    }
    loadPlayer(id);
  }, [loadPlayer, match.params.id]);

  if (loadingInitial) return <LoadingComponent content="Loading player..." />;

  if (!player) return <h2>No player</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <PlayerDetailedHeader player={player} />
        <PlayerDetailedInfo player={player} />
        <PlayerDetailedChat />
      </Grid.Column>
      <GridColumn width={6}>
        <PlayerDetailedSideBar />
      </GridColumn>
    </Grid>
  );
};

export default observer(PlayerDetails);
