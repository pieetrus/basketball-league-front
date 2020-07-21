import React, { useContext, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import PlayerStore from "../../../app/stores/playerStore";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import PlayerDetailedHeader from "./PlayerDetailedHeader";
import PlayerDetailedInfo from "./PlayerDetailedInfo";
import PlayerDetailedChat from "./PlayerDetailedChat";
import PlayerDetailedSideBar from "./PlayerDetailedSideBar";

interface DetailParams {
  id: string;
}

const PlayerDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const playerStore = useContext(PlayerStore);
  const { player, loadPlayer, loadingInitial } = playerStore;

  useEffect(() => {
    loadPlayer(Number.parseInt(match.params.id));
  }, [loadPlayer, match.params.id]);

  if (loadingInitial || !player)
    return <LoadingComponent content="Loading player..." />;

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
