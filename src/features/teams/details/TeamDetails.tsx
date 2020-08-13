import React, { useContext, useEffect } from "react";
import { Grid, GridColumn, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const TeamDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { team, loadTeam, loadingInitial } = rootStore.teamStore;

  useEffect(() => {
    let id = Number(match.params.id);
    if (isNaN(id)) {
      id = -1;
    }
    loadTeam(id);
  }, [loadTeam, match.params.id]);

  if (loadingInitial) return <LoadingComponent content="Loading team..." />;

  if (!team) return <h2>No team</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        {team.name}
        <Button
          as={Link}
          to={`/manager/team/${team.id}`}
          color="orange"
          floated="right"
          content="Manage team"
        />
      </Grid.Column>
      <GridColumn width={6}>{team.shortName}</GridColumn>
    </Grid>
  );
};

export default observer(TeamDetails);
