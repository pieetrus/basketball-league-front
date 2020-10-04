import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { Menu, Header, Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import RankingTeamsTable from "./RankingTeamsTable";

const TablesDashboard = () => {
  const rootStore = useContext(RootStoreContext);
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
    loadSeasons().then(loadTeamsSeason);
    loadDivisions();
  }, [loadSeasons, loadTeamsSeason, loadDivisions]);

  if (loadingSeasons || loadingInitialSeason || loadingDivisions)
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
        {seasonsByDate.map((season, index) => (
          <Menu.Item
            key={index}
            content={season.name}
            name={season.name}
            active={predicate.get("seasonId") === season.id?.toString()}
            onClick={() => {
              if (predicate.get("seasonId") !== season.id?.toString()) {
                setPredicate("seasonId", season.id?.toString());
                loadTeamsSeason();
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
                loadTeamsSeason();
              }
            }}
          />
        ))}
      </Menu>
      <Grid centered style={{ marginTop: 100 }}>
        <Grid.Column width={6}>
          {teamsSeasonByName.length > 0 && (
            <RankingTeamsTable teams={teamsSeasonByName} />
          )}
          {teamsSeasonByName.length <= 0 && <Header>No teams</Header>}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(TablesDashboard);
