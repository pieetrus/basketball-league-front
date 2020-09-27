import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid, Segment } from "semantic-ui-react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { IPlayerMatch } from "../../app/models/playerMatch";
import { RootStoreContext } from "../../app/stores/rootStore";
import ActionLog from "../statsProgram/ActionLog";
import ActisonLog from "../statsProgram/ActionLog";
import MatchTopBar from "./MatchTopBar";
import PlayerMatchTable from "./PlayerMatchTable";
interface DetailParams {
  id: string;
}
const MatchDashboard: React.FC<RouteComponentProps<DetailParams>> = ({
  match: match2,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    selectedMatch: match,
    loading,
    setSelectedMatch,
    loadPlayerMatches,
    playerMatches,
    loadingPlayerMatches,
  } = rootStore.matchStore;
  const {
    loadIncidents,
    loadingMatch,
    loadMatch,
    setPlayersInGameFromMatchModel,
  } = rootStore.statsProgramStore;

  useEffect(() => {
    let id = Number(match2.params.id);
    if (isNaN(id)) {
      id = -1;
    }
    setSelectedMatch(id);
    loadMatch(id);
    loadIncidents(id);
    setPlayersInGameFromMatchModel();
    loadPlayerMatches(id);
  }, [
    setSelectedMatch,
    match2.params.id,
    loadIncidents,
    setPlayersInGameFromMatchModel,
    loadMatch,
    history,
    loadPlayerMatches,
  ]);

  if (loading || loadingMatch || loadingPlayerMatches)
    return <LoadingComponent content="Loading match details" />;
  return (
    <Grid centered>
      <MatchTopBar match={match!} />
      <ActionLog />
      <PlayerMatchTable playerMatches={playerMatches} />
    </Grid>
  );
};

export default observer(MatchDashboard);
