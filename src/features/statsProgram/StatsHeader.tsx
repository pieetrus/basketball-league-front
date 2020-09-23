import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Segment, Grid, GridColumn, Button } from "semantic-ui-react";
import Timer from "../../app/common/timer/Timer";
import { RootStoreContext } from "../../app/stores/rootStore";
import TeamScore from "./TeamScore";

const StatsHeader = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    teamGuest,
    teamHome,
    timeInSeconds,
    loadingIncidents,
    quater,
    quaterEnded,
    setNextQuater,
    setTimeLeft,
    setMinutesLeft,
    setSecondsLeft,
  } = rootStore.statsStore;

  const [timerActive, setTimerActive] = useState(false);

  const startNewQuaterHanlder = () => {
    setNextQuater();
    setTimeLeft(timeInSeconds);
    setMinutesLeft(Math.floor(timeInSeconds / 60));
    setSecondsLeft(timeInSeconds % 60);
  };

  return (
    <Grid.Row>
      <Grid.Column width={16}>
        <Segment>
          <Grid centered>
            <GridColumn width={6} floated="left" verticalAlign="middle">
              <TeamScore isHomeTeam={true} team={teamHome!} />
            </GridColumn>
            <GridColumn width={4}>
              <Segment textAlign="center">
                {!loadingIncidents && (
                  <Timer quater={quater} paused={!timerActive} />
                )}

                {!quaterEnded && !timerActive && (
                  <Button
                    content={"Start clock"}
                    positive
                    onClick={() => {
                      setTimerActive(true);
                    }}
                  />
                )}
                {!quaterEnded && timerActive && (
                  <Button
                    content={"Stop clock"}
                    negative
                    onClick={() => {
                      setTimerActive(false);
                    }}
                  />
                )}
                {quaterEnded && (
                  <Button
                    content={"End " + quater + ". quater"}
                    primary
                    onClick={() => {
                      setTimerActive(false);
                      startNewQuaterHanlder();
                    }}
                  />
                )}
              </Segment>
            </GridColumn>
            <GridColumn width={6} floated="right" verticalAlign="middle">
              <TeamScore isHomeTeam={false} team={teamGuest!} />
            </GridColumn>
          </Grid>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  );
};

export default observer(StatsHeader);
