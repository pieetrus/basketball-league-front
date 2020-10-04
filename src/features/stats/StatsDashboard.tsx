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

  const {
    loadDivisions,
    divisionsByLevel,
    loadingInitial: loadingDivisions,
  } = rootStore.divisionStore;

  useEffect(() => {
    loadSeasons().then(() => {
      loadPlayersSeason();
      loadTeamsSeason();
    });
    loadDivisions();
  }, [loadTeamsSeason, loadPlayersSeason, loadSeasons]);

  if (
    loadingInitial ||
    loadingInitialSeason ||
    loadingSeasons ||
    loadingDivisions
  )
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
        {seasonsByDate &&
          seasonsByDate.map((season, index) => (
            <Menu.Item
              key={index}
              content={season.name}
              name={season.name}
              active={predicate.get("seasonId") === season.id?.toString()}
              onClick={() => {
                if (predicate.get("seasonId") !== season.id?.toString()) {
                  setPredicate("seasonId", season.id?.toString());
                  setPlayersPredicate("seasonId", season.id?.toString());
                  loadTeamsSeason();
                  loadPlayersSeason();
                }
              }}
            />
          ))}
      </Menu>
      <Menu>
        <Header
          icon={"filter"}
          attached
          color="teal"
          content="Division filters"
        />
        {divisionsByLevel.map((division, index) => (
          <Menu.Item
            key={index}
            content={division.name}
            name={division.name}
            active={predicate.get("divisionId") === division.id?.toString()}
            onClick={() => {
              if (predicate.get("divisionId") !== division.id?.toString()) {
                setPredicate("divisionId", division.id?.toString());
                setPlayersPredicate("divisionId", division.id?.toString());
                loadPlayersSeason();
                loadTeamsSeason();
              }
            }}
          />
        ))}
      </Menu>

      <Header content="Player stats" />
      {playersSeason && playersSeason.length > 0 && (
        <PlayerSeasonTable playerSeasonArray={playersSeason} />
      )}
      <Header content="Team stats" />
      {teamsSeasonByName && teamsSeasonByName.length > 0 && (
        <TeamSeasonTable teamsSeason={teamsSeasonByName} />
      )}
    </Fragment>
  );
};

export default observer(StatsDashboard);
