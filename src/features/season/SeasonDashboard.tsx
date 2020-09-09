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
import { format } from "date-fns";

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

  seasonsByDate.forEach((season) => {
    panes.push({
      menuItem: season.name,
      render: () => (
        <Tab.Pane>
          <Segment textAlign="center">
            <Header content={season.name} />
            <Header
              content={"Start: " + format(season.startDate!, "MM/dd/yyyy")}
            />
            <Header
              content={"   End: " + format(season.endDate!, "MM/dd/yyyy")}
            />
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
                          size="tiny"
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
                      <GridColumn width={6}>
                        <Button
                          content="Remove"
                          onClick={() =>
                            toast.info(
                              "Not implemented yet. You can do it also from edit season modal level."
                            )
                          }
                          color="red"
                          size="tiny"
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
              content="Edit season"
              color="instagram"
              onClick={(e) => {
                openModal(<SeasonForm season={season} />);
              }}
              name={season.id}
              loading={target === season.id}
              style={{ marginRight: 20 }}
            />
            <Button
              content="Delete season"
              color="red"
              onClick={(e) => {
                if (season.id) deleteSeason(e, season.id!);
                else toast.warn("Error. Try again after page refresh");
              }}
              name={season.id}
              loading={target === season.id && deleting}
              style={{ marginLeft: 20 }}
            />
          </Segment>
          <Grid>
            <Grid.Column textAlign="center">
              <Button
                content="Create Season"
                color="green"
                size="large"
                onClick={() => openModal(<SeasonForm />)}
              />
            </Grid.Column>
          </Grid>
        </Tab.Pane>
      ),
    });
  });

  if (seasonLoadingInitial && teamLoadingInitial)
    return <LoadingComponent content="Loading ..." />;
  return (
    <Fragment>
      <ManagerNavBar />
      {panes.length > 0 && (
        <Tab
          menu={{ fluid: true, vertical: true }}
          menuPosition="right"
          panes={panes}
        />
      )}
      {panes.length <= 0 && (
        <Segment>
          <Grid>
            <Grid.Column textAlign="center">
              <Button
                content="Create Season"
                color="green"
                size="large"
                onClick={() => openModal(<SeasonForm />)}
              />
            </Grid.Column>
          </Grid>
        </Segment>
      )}
    </Fragment>
  );
};

export default observer(SeasonDashboard);
