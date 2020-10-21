import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid, Tab } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import ActionLog from "../statsProgram/ActionLog";
import MatchPlayerStats from "./MatchPlayerStats";
import MatchTopBar from "./MatchTopBar";
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
    loadingPlayerMatches,
    createHubConnection,
    stopHubConnection,
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
    createHubConnection();
    return () => {
      stopHubConnection();
    };
  }, [
    setSelectedMatch,
    match2.params.id,
    loadIncidents,
    setPlayersInGameFromMatchModel,
    loadMatch,
    history,
    loadPlayerMatches,
    createHubConnection,
    stopHubConnection,
  ]);

  const panes = [
    // { menuItem: "Summary", render: () => <Tab.Pane>Summary content</Tab.Pane> },
    {
      menuItem: "Stats",
      render: () => (
        <Tab.Pane>
          <MatchPlayerStats />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Play by play",
      render: () => (
        <Tab.Pane>
          <Grid centered>
            <Grid.Column width={10}>
              <ActionLog />
            </Grid.Column>
          </Grid>
        </Tab.Pane>
      ),
    },
  ];

  if (loading || loadingMatch || loadingPlayerMatches)
    return <LoadingComponent content="Loading match details" />;
  return (
    <Fragment>
      <MatchTopBar match={match!} />
      <Tab panes={panes} style={{ marginTop: 40 }} />
    </Fragment>
  );
};

export default observer(MatchDashboard);
