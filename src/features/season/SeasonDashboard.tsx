import React, { Fragment, useContext, useEffect } from "react";
import {
  Segment,
  Tab,
  Button,
  List,
  ListItem,
  Header,
  Grid,
  GridColumn,
} from "semantic-ui-react";
import ManagerNavBar from "../nav/ManagerNavBar";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import SeasonForm from "./SeasonForm";
import { toast } from "react-toastify";
import TeamSeasonManager from "./TeamSeasonManager";

const SeasonDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    seasonsByDate,
    loadSeasons,
    loadingInitial: seasonLoadingInitial,
    deleteSeason,
    target,
    deleting,
  } = rootStore.seasonStore;

  const {
    loadingInitial: teamLoadingInitial,
    loadTeams,
    setPredicate,
    clearPredicate,
  } = rootStore.teamStore;
  const { loadDivisions } = rootStore.divisionStore;
  const { openModal } = rootStore.modalStore;

  useEffect(() => {
    loadDivisions();
    loadSeasons();
    loadTeams();
  }, [loadDivisions, loadTeams, loadSeasons]);

  const panes: any[] = [];

  seasonsByDate.map((season) => {
    panes.push({
      menuItem: season.name,
      render: () => (
        <Tab.Pane>
          <Segment textAlign="center">
            <Header content={season.name} />
            <Header content="Divisions" />

            <List>
              {season.divisions.map((division, index) => (
                <Fragment key={index}>
                  <ListItem>
                    <Grid centered>
                      <GridColumn width={3}>{division.name}</GridColumn>
                      <GridColumn width={4}>
                        <Button
                          content={"Manage teams"}
                          onClick={() => {
                            openModal(
                              <TeamSeasonManager
                                season={season}
                                division={division}
                              />
                            );
                            clearPredicate();
                            setPredicate("seasonId", season.id?.toString());
                            setPredicate("divisionId", division.id?.toString());
                          }}
                        />
                      </GridColumn>
                    </Grid>
                  </ListItem>
                </Fragment>
              ))}
            </List>
          </Segment>
          <Segment textAlign="center">
            <Button
              content="Delete season"
              color="red"
              onClick={(e) => {
                if (season.id) deleteSeason(e, season.id!);
                else toast.warn("Error. Try again after page refresh");
              }}
              name={season.id}
              loading={target === season.id && deleting}
            />
          </Segment>
        </Tab.Pane>
      ),
    });
  });

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
          onClick={() => openModal(<SeasonForm />)}
        />
      </Segment>
    </Fragment>
  );
};

export default observer(SeasonDashboard);
