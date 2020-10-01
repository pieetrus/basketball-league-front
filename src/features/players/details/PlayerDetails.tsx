import React, { Fragment, useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import PlayerDetailedHeader from "./PlayerDetailedHeader";
import PlayerDetailedInfo from "./PlayerDetailedInfo";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PlayerSeasonStatsTable from "./PlayerSeasonStatsTable";

interface DetailParams {
  id: string;
}

const PlayerDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    player,
    loadPlayer,
    loadingInitial,
    loadPlayerSeasonStats,
    loadingInitialPlayerSeason,
  } = rootStore.playerStore;

  useEffect(() => {
    let id = Number(match.params.id);
    if (isNaN(id)) {
      id = -1;
    }
    loadPlayerSeasonStats(id);
    loadPlayer(id);
  }, [loadPlayer, loadPlayerSeasonStats, match.params.id]);

  if (loadingInitial || loadingInitialPlayerSeason)
    return <LoadingComponent content="Loading player..." />;

  if (!player) return <h2>No player</h2>;

  return (
    <Fragment>
      <PlayerDetailedHeader player={player} />
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <PlayerDetailedInfo player={player} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ marginTop: 160 }}>
          <PlayerSeasonStatsTable />
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default observer(PlayerDetails);
