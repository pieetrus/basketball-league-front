import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import MatchElement from "./MatchElement";

const ScheduleDashoard = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadMatchesDetailed,
    matchesDetailedByDate,
    loadingInitial,
  } = rootStore.matchStore;

  useEffect(() => {
    loadMatchesDetailed();
  }, [loadMatchesDetailed]);

  if (loadingInitial) return <LoadingComponent content="loading matches" />;

  if (!matchesDetailedByDate) return <h2>No match</h2>;

  return (
    <Grid centered>
      {matchesDetailedByDate.map((match) => (
        <MatchElement match={match} key={match.id} />
      ))}
    </Grid>
  );
};

export default observer(ScheduleDashoard);
