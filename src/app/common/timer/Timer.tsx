import { observer } from "mobx-react-lite";
import React, { useEffect, useContext } from "react";
import { Grid, GridColumn, GridRow, Header, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/rootStore";
import { MatchDurationInSeconds } from "../global";

const Timer: React.FC<{
  paused: boolean;
  quater: number;
}> = ({ paused, quater }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    setQuaterEnded,
    timeLeft,
    setTimeLeft,
    setMinutesLeft,
    setSecondsLeft,
    minutesLeft,
    secondsLeft,
  } = rootStore.statsProgramStore;

  // initialize timeLeft with the seconds prop

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) {
      setQuaterEnded(true);
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      if (secondsLeft === 0) {
        setMinutesLeft(minutesLeft - 1);
        setSecondsLeft(59);
        setTimeLeft(timeLeft - 1);
      } else {
        setTimeLeft(timeLeft - 1);
        setSecondsLeft(secondsLeft - 1);
      }
    }, 1000);

    if (paused) clearInterval(intervalId);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [
    timeLeft,
    paused,
    secondsLeft,
    minutesLeft,
    setQuaterEnded,
    setMinutesLeft,
    setSecondsLeft,
    setTimeLeft,
  ]);

  return (
    <Grid centered>
      <GridColumn width={1} style={{ right: 15 }}>
        <GridRow verticalAlign="top">
          <i
            className="angle double up icon"
            style={{ fontSize: 15, cursor: "pointer" }}
            onClick={() => {
              if (timeLeft < MatchDurationInSeconds) {
                setQuaterEnded(false);
                if (timeLeft > MatchDurationInSeconds - 61) {
                  setTimeLeft(MatchDurationInSeconds);
                  setMinutesLeft(10);
                  setSecondsLeft(0);
                } else {
                  setTimeLeft(timeLeft + 60);
                  setMinutesLeft(minutesLeft + 1);
                }
              }
            }}
            // onMouseEnter={() => console.log("reminder to do on hover effect")}
          ></i>
        </GridRow>
        <GridRow>
          <i
            className="angle double down icon"
            style={{ fontSize: 15, cursor: "pointer" }}
            onClick={() => {
              if (timeLeft < 59) {
                setTimeLeft(0);
                setMinutesLeft(0);
                setSecondsLeft(0);
              } else {
                setTimeLeft(timeLeft - 60);
                setMinutesLeft(minutesLeft - 1);
              }
              if (timeLeft === 0) setQuaterEnded(true);
            }}
          ></i>
        </GridRow>
      </GridColumn>
      <GridColumn width={6} verticalAlign="middle">
        <Segment
          compact
          style={{ position: "absolute", bottom: 35, right: 6, width: 90 }}
        >
          {"Quarter " + quater}
        </Segment>
        <Header size="large">
          <span id="minutes-left">
            {minutesLeft < 10 && "0" + minutesLeft}
            {minutesLeft >= 10 && minutesLeft}
          </span>
          :
          <span id="seconds-left">
            {secondsLeft < 10 && "0" + secondsLeft}
            {secondsLeft >= 10 && secondsLeft}
          </span>
        </Header>
      </GridColumn>
      <GridColumn width={1} style={{ right: 15 }}>
        <GridRow verticalAlign="top">
          <i
            className="angle double up icon"
            style={{ fontSize: 15, cursor: "pointer" }}
            onClick={() => {
              setQuaterEnded(false);
              if (timeLeft < MatchDurationInSeconds) {
                setTimeLeft(timeLeft + 1);
                if (secondsLeft < 59) setSecondsLeft(secondsLeft + 1);
                if (secondsLeft > 58) {
                  setSecondsLeft(0);
                  setMinutesLeft(minutesLeft + 1);
                }
              }
            }}
            // onMouseEnter={() => console.log("reminder to do on hover effect")}
          ></i>
        </GridRow>
        <GridRow>
          <i
            className="angle double down icon"
            style={{ fontSize: 15, cursor: "pointer" }}
            onClick={() => {
              if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
                if (secondsLeft > 0) setSecondsLeft(secondsLeft - 1);
                if (secondsLeft === 0) {
                  setSecondsLeft(59);
                  setMinutesLeft(minutesLeft - 1);
                }
              }
              if (timeLeft === 0) setQuaterEnded(true);
            }}
          ></i>
        </GridRow>
      </GridColumn>
    </Grid>
  );
};

export default observer(Timer);
