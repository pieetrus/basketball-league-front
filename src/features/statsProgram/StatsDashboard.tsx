import React, { Fragment, useState } from "react";
import { Segment, Grid, GridColumn, Button } from "semantic-ui-react";
import { MatchDurationInSeconds } from "../../app/common/global";
import Timer from "../../app/common/timer/Timer";

const StatsDashboard = () => {
  const [timerActive, setTimerActive] = useState(false);
  const [secondsLeft] = useState(MatchDurationInSeconds);

  function getData(val: any) {
    console.log(val); // prototype only to get data from timer
  }
  return (
    <Fragment>
      <Grid centered>
        <GridColumn width={16}>
          <Segment>
            <Grid centered>
              <GridColumn width={4}>
                <Segment textAlign="center">
                  <Timer
                    seconds={secondsLeft}
                    paused={!timerActive}
                    sendData={getData}
                  />
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
            </Grid>
          </Segment>
        </GridColumn>
        <GridColumn width={8}></GridColumn>
      </Grid>
    </Fragment>
  );
};

export default StatsDashboard;
