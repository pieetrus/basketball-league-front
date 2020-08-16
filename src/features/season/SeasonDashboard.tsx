import React, { Fragment, useContext, useEffect } from "react";
import { Segment, Tab, Button } from "semantic-ui-react";
import ManagerNavBar from "../nav/ManagerNavBar";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import TeamSeasonForm from "./TeamSeasonForm";

const SeasonDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    seasonsByDate,
    loadSeasons,
    loadingInitial: seasonLoadingInitial,
    deleteSeason,
    submitting: seasonSubmitting,
  } = rootStore.seasonStore;

  const { loadingInitial: teamLoadingInitial, loadTeams } = rootStore.teamStore;
  const { loadDivisions } = rootStore.divisionStore;
  const { openModal } = rootStore.modalStore;

  useEffect(() => {
    loadDivisions();
    loadSeasons();
    loadTeams();
  }, [loadDivisions, loadTeams, loadSeasons]);

  const panes: any[] = [];

  seasonsByDate.map((season) =>
    panes.push({
      menuItem: season.name,
      render: () => (
        <Tab.Pane>
          <Segment textAlign="center">
            <Button
              content="Delete season"
              color="red"
              onClick={(e) => deleteSeason(e, season.id!)}
              loading={seasonSubmitting}
            />
          </Segment>
          <Segment textAlign="center">
            <Button
              content="Assign team for season"
              color="vk"
              onClick={() => openModal(<TeamSeasonForm season={season} />)}
              loading={seasonSubmitting}
            />
          </Segment>
        </Tab.Pane>
      ),
    })
  );

  if (seasonLoadingInitial && teamLoadingInitial)
    return <LoadingComponent content="Loading ..." />;
  return (
    <Fragment>
      <ManagerNavBar />
      <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition="right"
        panes={panes}
      />
      <Segment textAlign="center">
        <Button
          content="Create Season"
          color="green"
          size="large"
          onClick={() => console.log("form")}
        />
      </Segment>
    </Fragment>
  );
};

export default observer(SeasonDashboard);
