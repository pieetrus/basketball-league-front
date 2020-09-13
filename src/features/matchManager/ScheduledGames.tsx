import React, { useContext } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import MatchItem from "./MatchItem";

const ScheduledGames = () => {
  const rootStore = useContext(RootStoreContext);
  const { matchesDetailedByDate, loadingInitial } = rootStore.matchStore;

  if (loadingInitial) return <LoadingComponent content="Loading..." />;

  return (
    <Segment>
      {matchesDetailedByDate?.map((match) => (
        <MatchItem key={match.id} match={match} />
      ))}
    </Segment>
  );
};

export default observer(ScheduledGames);
