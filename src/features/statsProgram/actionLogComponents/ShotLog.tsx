import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Segment, ItemGroup, Item, Grid, Divider } from "semantic-ui-react";
import { ReboundType } from "../../../app/common/global";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { IIncident } from "../../../app/models/incident";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ShotLog: React.FC<{ incident: IIncident }> = ({ incident }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    deleteIncident,
    submitting,
    target,
    teamGuestJerseyColor,
    teamHomeJerseyColor,
    match,
    editableActionLog,
  } = rootStore.statsProgramStore;

  const jerseyColor = (isGuest: boolean) => {
    if (isGuest) return teamGuestJerseyColor;
    else return teamHomeJerseyColor;
  };

  const getPlayerInfo = (id: number) => {
    let player = match?.teamHomePlayers.find((x) => x.playerId === id);
    if (player === undefined)
      player = match?.teamGuestPlayers.find((x) => x.playerId === id);

    let response =
      player?.jerseyNr + "." + player?.name + " " + player?.surname;

    return response;
  };

  const getTeamInfo = (id: number) => {
    let team;
    if (match?.teamGuest.id === id) team = match.teamGuest;
    if (match?.teamHome.id === id) team = match.teamHome;

    return team?.name;
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
                {incident.shot!.isAccurate && (
                  <Grid.Column width={4}>SHOT MADE</Grid.Column>
                )}
                {!incident.shot!.isAccurate && (
                  <Grid.Column width={4}>SHOT MISSED</Grid.Column>
                )}
                {editableActionLog && (
                  <Grid.Column width={2}>
                    <i
                      className="edit icon"
                      style={{ fontSize: 20, cursor: "pointer" }}
                    ></i>
                  </Grid.Column>
                )}
                {/*  eslint-disable-next-line eqeqeq */}
                {!submitting && target != incident.id && editableActionLog && (
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
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={3} verticalAlign="middle">
                      {incident.shot!.isAccurate && (
                        <Segment
                          inverted
                          color={jerseyColor(incident.isGuest)}
                          content={incident.shot!.value + "PM"}
                        />
                      )}
                      {!incident.shot!.isAccurate && (
                        <Segment
                          inverted
                          color={jerseyColor(incident.isGuest)}
                          content={incident.shot!.value + "PA"}
                        />
                      )}
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Segment
                        content={getPlayerInfo(incident.shot!.playerId)}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  {incident.shot!.assist?.playerId && (
                    <Grid.Row>
                      <Grid.Column width={3} verticalAlign="middle">
                        <Segment
                          inverted
                          color={jerseyColor(incident.isGuest)}
                          content="AST"
                        />
                      </Grid.Column>
                      <Grid.Column width={10}>
                        <Segment
                          content={getPlayerInfo(
                            incident.shot!.assist?.playerId
                          )}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  )}
                  {!incident.shot!.isAccurate && (
                    <Grid.Row>
                      <Grid.Column width={3} verticalAlign="middle">
                        {(incident.shot!.rebound?.reboundType ===
                          ReboundType.PLAYER_OFF ||
                          incident.shot!.rebound?.reboundType ===
                            ReboundType.TEAM_OFF) && (
                          <Segment
                            inverted
                            color={jerseyColor(incident.isGuest)}
                            content="REB"
                          />
                        )}
                        {(incident.shot!.rebound?.reboundType ===
                          ReboundType.PLAYER_DEF ||
                          incident.shot!.rebound?.reboundType ===
                            ReboundType.TEAM_DEF) && (
                          <Segment
                            inverted
                            color={jerseyColor(!incident.isGuest)}
                            content="REB"
                          />
                        )}
                      </Grid.Column>
                      <Grid.Column width={10}>
                        {(incident.shot!.rebound?.reboundType ===
                          ReboundType.PLAYER_OFF ||
                          incident.shot!.rebound?.reboundType ===
                            ReboundType.PLAYER_DEF) && (
                          <Segment
                            content={getPlayerInfo(
                              incident.shot?.rebound?.playerId!
                            )}
                          />
                        )}
                        {(incident.shot!.rebound?.reboundType ===
                          ReboundType.TEAM_DEF ||
                          incident.shot!.rebound?.reboundType ===
                            ReboundType.TEAM_OFF) && (
                          <Segment
                            content={getTeamInfo(
                              incident.shot?.rebound?.teamId!
                            )}
                          />
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  )}
                </Grid>
              </Item.Meta>
            </Item.Content>
          </Item>
        }
      </ItemGroup>
    </Segment>
  );
};

export default observer(ShotLog);
