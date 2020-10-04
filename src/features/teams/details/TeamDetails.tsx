import React, { useContext, useEffect } from "react";
import { Button, Grid, Header, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import TeamSeasonStatsTable from "./TeamSeasonStatsTable";
import { Fragment } from "react";

interface DetailParams {
  id: string;
}

const TeamDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    team,
    loadTeam,
    loadingInitial,
    loadTeamsSeason,
    loadingInitialSeason,
    setPredicate,
  } = rootStore.teamStore;

  useEffect(() => {
    let id = Number(match.params.id);
    if (isNaN(id)) {
      id = -1;
    }
    setPredicate("teamId", id.toString());
    loadTeam(id);
    loadTeamsSeason();
  }, [loadTeam, match.params.id, loadTeamsSeason, setPredicate]);

  if (loadingInitial || loadingInitialSeason)
    return <LoadingComponent content="Loading team..." />;

  if (!team) return <h2>No team</h2>;

  return (
    <Fragment>
      <Header size="huge">{team.name}</Header>
      <Image src={team.logoUrl} size="medium" floated="right" avatar />
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{team.shortName}</Grid.Column>
          <Grid.Column width={4}>
            <Button
              as={Link}
              to={`/manager/team/${team.id}`}
              color="orange"
              content="Manage team"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ marginTop: 260 }}>
          <TeamSeasonStatsTable />
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default observer(TeamDetails);
