/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { Header, Menu } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import PlayerSeasonTable from "./PlayerSeasonTable";
import TeamSeasonTable from "./TeamSeasonTable";

const StatsDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadPlayersSeason,
    loadingInitial,
    playersSeason,
    setPredicate: setPlayersPredicate,
  } = rootStore.playerStore;

  const {
    loadTeamsSeason,
    teamsSeasonByName,
    loadingInitialSeason,
    setPredicate,
    predicate,
  } = rootStore.teamStore;

  const {
    loadSeasons,
    seasonsByDate,
    loadingInitial: loadingSeasons,
  } = rootStore.seasonStore;

  useEffect(() => {
    loadPlayersSeason();
    loadTeamsSeason();
    loadSeasons();
  }, [loadTeamsSeason, loadPlayersSeason, loadSeasons]);

  if (loadingInitial || loadingInitialSeason || loadingSeasons)
    return <LoadingComponent content="Loading data..." />;
  return (
    <Fragment>
      <Menu>
        <Header
          icon={"filter"}
          attached
          color="teal"
          content="Season filters"
        />
        {seasonsByDate.map((season) => (
          <Menu.Item
            content={season.name}
            name={season.name}
            active={predicate.get("seasonId") === season.id?.toString()}
            onClick={() => {
              setPredicate("seasonId", season.id?.toString());
              setPlayersPredicate("seasonId", season.id?.toString());
              loadTeamsSeason();
              loadPlayersSeason();
            }}
          />
        ))}
      </Menu>
      <Header content="Player stats" />
      {playersSeason && <PlayerSeasonTable playerSeasonArray={playersSeason} />}
      <Header content="Team stats" />
      {teamsSeasonByName && <TeamSeasonTable teamsSeason={teamsSeasonByName} />}
    </Fragment>
  );
};

export default observer(StatsDashboard);
