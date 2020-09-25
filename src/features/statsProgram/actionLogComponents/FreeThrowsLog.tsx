import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Segment, ItemGroup, Item, Grid, Divider } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { IIncident } from "../../../app/models/incident";
import { RootStoreContext } from "../../../app/stores/rootStore";

const FreeThrowsLog: React.FC<{ incident: IIncident }> = ({ incident }) => {
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
                <Grid.Column width={6}>
                  {"Q" +
                    incident.quater +
                    " " +
                    incident.minutes +
                    ":" +
                    incident.seconds}
                </Grid.Column>
                <Grid.Column width={6}>{"FREE THROWS"}</Grid.Column>
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
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={3} verticalAlign="middle">
                      <Segment
                        inverted
                        color={jerseyColor(!incident.isGuest)}
                        content={
                          incident.foul?.freeThrows?.accurateShots +
                          "/" +
                          incident.foul?.freeThrows?.attempts
                        }
                      />
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Segment
                        content={getPlayerInfo(
                          incident.foul?.freeThrows?.playerShooterId!
                        )}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  {incident.foul?.freeThrows?.assist && (
                    <Grid.Row>
                      <Grid.Column width={3} verticalAlign="middle">
                        <Segment
                          inverted
                          color={jerseyColor(!incident.isGuest)}
                          content={"AST"}
                        />
                      </Grid.Column>
                      <Grid.Column width={10}>
                        <Segment
                          content={getPlayerInfo(
                            incident.foul?.freeThrows?.assist.playerId!
                          )}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  )}
                  {incident.foul?.freeThrows?.rebound && (
                    <Grid.Row>
                      <Grid.Column width={3} verticalAlign="middle">
                        {(incident.foul?.freeThrows.rebound?.reboundType ===
                          1 ||
                          incident.foul?.freeThrows.rebound?.reboundType ===
                            3) && (
                          <Segment
                            inverted
                            color={jerseyColor(!incident.isGuest)}
                            content="REB"
                          />
                        )}

                        {(incident.foul?.freeThrows.rebound?.reboundType ===
                          2 ||
                          incident.foul?.freeThrows.rebound?.reboundType ===
                            4) && (
                          <Segment
                            inverted
                            color={jerseyColor(incident.isGuest)}
                            content="REB"
                          />
                        )}
                      </Grid.Column>
                      <Grid.Column width={10}>
                        {(incident.foul?.freeThrows.rebound?.reboundType ===
                          1 ||
                          incident.foul?.freeThrows.rebound?.reboundType ===
                            2) && (
                          <Segment
                            content={getPlayerInfo(
                              incident.foul?.freeThrows?.rebound.playerId!
                            )}
                          />
                        )}
                        {(incident.foul?.freeThrows.rebound?.reboundType ===
                          3 ||
                          incident.foul?.freeThrows.rebound?.reboundType ===
                            4) && (
                          <Segment
                            content={getTeamInfo(
                              incident.foul?.freeThrows?.rebound.teamId!
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

export default observer(FreeThrowsLog);
