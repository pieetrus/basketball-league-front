import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Divider, Grid, Item, ItemGroup, Segment } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import { toJS } from "mobx";

const ActionLog = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadingIncidents, getIncidents } = rootStore.statsStore;

  if (loadingIncidents)
    return (
      <Segment>
        <LoadingComponent content="Loading incidents" />
      </Segment>
    );
  return (
    <Segment style={{ overflow: "auto", maxHeight: 450 }}>
      {getIncidents &&
        toJS(getIncidents).map((incident) => (
          <Segment key={incident.id}>
            <ItemGroup divided>
              <Item>
                <Item.Content>
                  <Grid>
                    <Grid.Column width={12}>
                      {"Q" +
                        incident.quater +
                        " " +
                        incident.minutes +
                        ":" +
                        incident.seconds}
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <i
                        className="edit icon"
                        style={{ fontSize: 20, cursor: "pointer" }}
                      ></i>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <i
                        className="trash icon"
                        style={{ fontSize: 20, cursor: "pointer" }}
                      ></i>
                    </Grid.Column>
                  </Grid>
                  <Divider />
                  <Item.Meta>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={3} verticalAlign="middle">
                          {incident.shot.isAccurate && (
                            <Segment
                              inverted
                              color="blue"
                              content={incident.shot.value + "PM"}
                            />
                          )}
                          {!incident.shot.isAccurate && (
                            <Segment
                              inverted
                              color="red"
                              content={incident.shot.value + "PA"}
                            />
                          )}
                        </Grid.Column>
                        <Grid.Column width={10}>
                          <Segment content={incident.shot.playerId} />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={3} verticalAlign="middle">
                          <Segment inverted color="blue" content="AST" />
                        </Grid.Column>
                        <Grid.Column width={10}>
                          <Segment content={incident.shot.playerAssistId} />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Item.Meta>
                </Item.Content>
              </Item>
            </ItemGroup>
          </Segment>
        ))}
      {/* <Segment>
        <ItemGroup divided>
          <Item>
            <Item.Content>
              <Grid>
                <Grid.Column width={14}>Q1 9:46 0-6</Grid.Column>
                <Grid.Column width={2}>
                  <i
                    className="trash icon"
                    color="red"
                    style={{ fontSize: 20, cursor: "pointer" }}
                  ></i>
                </Grid.Column>
              </Grid>
              <Divider />
              <Item.Meta>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={3} verticalAlign="middle">
                      <Segment inverted color="blue" content="3PM" />
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Segment content="12. Jakub Pietrus" />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={3} verticalAlign="middle">
                      <Segment inverted color="blue" content="AST" />
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Segment content="7. Radosław Lis" />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Item.Meta>
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment> */}
    </Segment>
  );
};

export default observer(ActionLog);
