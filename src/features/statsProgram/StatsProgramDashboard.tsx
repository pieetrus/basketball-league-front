import React, { useContext, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import GameInformation from "./GameInformation";
import { observer } from "mobx-react-lite";
import ScheduledGames from "./ScheduledGames";

const StatsProgramDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal, setDefaultModalSize } = rootStore.modalStore;
  const { loadTeams } = rootStore.teamStore;
  const { loadDivisions } = rootStore.divisionStore;
  const { loadMatches, loadMatchesDetailed } = rootStore.matchStore;

  useEffect(() => {
    loadTeams();
    loadDivisions();
    loadMatches();
    loadMatchesDetailed();
  }, [loadTeams, loadDivisions, loadMatches, loadMatchesDetailed]);

  return (
    <div>
      <Button
        content="New game"
        color="blue"
        positive
        onClick={() => {
          openModal(<GameInformation />);
          setDefaultModalSize();
        }}
      />
      <ScheduledGames />
    </div>
  );
};

export default observer(StatsProgramDashboard);
