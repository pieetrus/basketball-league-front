/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { Header } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import PlayerSeasonTable from "./PlayerSeasonTable";

const StatsDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadPlayersSeason,
    loadingInitial,
    playersSeason,
  } = rootStore.playerStore;

  const { loadTeamsSeason, teamsSeasonByName } = rootStore.teamStore;

  useEffect(() => {
    loadPlayersSeason();
  }, [loadPlayersSeason]);

  if (loadingInitial) return <LoadingComponent content="Loading players..." />;
  return (
    <Fragment>
      <Header content="Player stats" />
      <PlayerSeasonTable playerSeasonArray={playersSeason} />
      <Header content="Team stats" />
    </Fragment>
  );
};

export default observer(StatsDashboard);
