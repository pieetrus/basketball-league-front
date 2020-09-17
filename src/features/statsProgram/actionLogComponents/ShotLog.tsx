import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Segment, ItemGroup, Item, Grid, Divider } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { IIncident } from "../../../app/models/incident";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ShotLog: React.FC<{ incident: IIncident }> = ({ incident }) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteIncident, submitting, target } = rootStore.statsStore;

  return (
    <Segment key={incident.id}>
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
                      {incident.shot!.isAccurate && (
                        <Segment
                          inverted
                          color="blue"
                          content={incident.shot!.value + "PM"}
                        />
                      )}
                      {!incident.shot!.isAccurate && (
                        <Segment
                          inverted
                          color="red"
                          content={incident.shot!.value + "PA"}
                        />
                      )}
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Segment content={incident.shot!.playerId} />
                    </Grid.Column>
                  </Grid.Row>
                  {incident.shot!.playerAssistId && (
                    <Grid.Row>
                      <Grid.Column width={3} verticalAlign="middle">
                        <Segment inverted color="blue" content="AST" />
                      </Grid.Column>
                      <Grid.Column width={10}>
                        <Segment content={incident.shot!.playerAssistId} />
                      </Grid.Column>
                    </Grid.Row>
                  )}
                  {!incident.shot!.isAccurate && (
                    <Grid.Row>
                      <Grid.Column width={3} verticalAlign="middle">
                        <Segment inverted color="blue" content="REB" />
                      </Grid.Column>
                      <Grid.Column width={10}>
                        <Segment content={incident.shot!.playerAssistId} />
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