import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import ActionLog from "../statsProgram/ActionLog";
import MatchTopBar from "./MatchTopBar";
interface DetailParams {
  id: string;
}
const MatchDashboard: React.FC<RouteComponentProps<DetailParams>> = ({
  match: match2,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    selectedMatch: match,
    loading,
    setSelectedMatch,
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
  }, [
    setSelectedMatch,
    match2.params.id,
    loadIncidents,
    setPlayersInGameFromMatchModel,
    loadMatch,
  ]);

  if (loading || loadingMatch)
    return <LoadingComponent content="Loading match details" />;
  return (
    <Grid centered>
      <MatchTopBar match={match!} />
      <ActionLog />
    </Grid>
  );
};

export default observer(MatchDashboard);
