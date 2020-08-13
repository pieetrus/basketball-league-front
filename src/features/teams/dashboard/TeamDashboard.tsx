import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import TeamList from "./TeamList";

const TeamDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadTeams, loadingInitial } = rootStore.teamStore;

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  if (loadingInitial) return <LoadingComponent content="Loading teams..." />;
  return (
    <>
      <span>Tu będzie jeszcze filtr: SEZON | DYWIZJA</span>
      <TeamList />
    </>
  );
};

export default observer(TeamDashboard);
