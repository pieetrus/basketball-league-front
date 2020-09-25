import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Segment, ItemGroup, Item, Grid, Divider } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { IIncident } from "../../../app/models/incident";
import { RootStoreContext } from "../../../app/stores/rootStore";

const TimeoutLog: React.FC<{ incident: IIncident }> = ({ incident }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    deleteIncident,
    submitting,
    target,
    teamGuestJerseyColor,
    teamHomeJerseyColor,
    match,
  } = rootStore.statsProgramStore;

  const jerseyColor = (isGuest: boolean) => {
    if (isGuest) return teamGuestJerseyColor;
    else return teamHomeJerseyColor;
  };

  const getTeamName = (id: number) => {
    if (match?.teamHome.id === id) return match?.teamHome.name;
    else return match?.teamGuest.name;
  };
  return (
    <Segment>
      <ItemGroup divided>
        {
          <Item>
            <Item.Content>
              <Grid>
                <Grid.Column width={8}>
                  {"Q" +
                    incident.quater +
                    " " +
                    incident.minutes +
                    ":" +
                    incident.seconds}
                </Grid.Column>
                <Grid.Column width={4}>{"TIMEOUT"}</Grid.Column>
                <Grid.Column width={2}>
                  <i
                    className="edit icon"
                    style={{ fontSize: 20, cursor: "pointer" }}
                  ></i>
                </Grid.Column>
                {/*  eslint-disable-next-line eqeqeq */}
                {!submitting && target != incident.id && (
                  <Grid.Column width={2}>
                    <i
                      className="trash icon"
                      style={{ fontSize: 20, cursor: "pointer" }}
                      id={incident.id!.toString()}
                      onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                      ) => {
                        deleteIncident(e, incident.id!);
                      }}
                    ></i>
                  </Grid.Column>
                )}
                {/*  eslint-disable-next-line eqeqeq */}
                {submitting && target == incident.id && (
                  <Grid.Column width={2}>
                    <LoadingComponent />
                  </Grid.Column>
                )}
              </Grid>
              <Divider />
              <Item.Meta>
                <Segment color={jerseyColor(incident.isGuest)}>
                  {getTeamName(incident.timeout?.teamId!)}
                </Segment>
              </Item.Meta>
            </Item.Content>
          </Item>
        }
      </ItemGroup>
    </Segment>
  );
};

export default observer(TimeoutLog);
