import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Segment, Grid, GridColumn, Button } from "semantic-ui-react";
import { MatchDurationInSeconds } from "../../app/common/global";
import Timer from "../../app/common/timer/Timer";
import { RootStoreContext } from "../../app/stores/rootStore";
import TeamScore from "./TeamScore";

const StatsHeader = () => {
  const rootStore = useContext(RootStoreContext);
  const { teamGuest, teamHome } = rootStore.statsStore;

  const [timerActive, setTimerActive] = useState(false);
  const [secondsLeft] = useState(MatchDurationInSeconds);

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
                <Timer seconds={secondsLeft} paused={!timerActive} />
                {!timerActive && (
                  <Button
                    content={"Start clock"}
                    positive
                    onClick={() => {
                      setTimerActive(true);
                    }}
                  />
                )}
                {timerActive && (
                  <Button
                    content={"Stop clock"}
                    negative
                    onClick={() => {
                      setTimerActive(false);
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
