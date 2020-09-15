import React, { useState, useEffect } from "react";
import { Grid, GridColumn, GridRow, Header } from "semantic-ui-react";

const Timer: React.FC<{
  seconds: any;
  paused: boolean;
  sendData: (val: any) => void;
}> = ({ seconds, paused, sendData }) => {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [minutesLeft, setMinutesLeft] = useState(Math.floor(seconds / 60));
  const [secondsLeft, setSecondsLeft] = useState(seconds % 60);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

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
      sendData(timeLeft);
    }, 1000);

    if (paused) clearInterval(intervalId);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft, paused, secondsLeft, minutesLeft, sendData]);

  return (
    <Grid centered>
      <GridColumn width={1} style={{ right: 15 }}>
        <GridRow verticalAlign="top">
          <i
            className="angle double up icon"
            style={{ fontSize: 15, cursor: "pointer" }}
            onClick={() => {
              if (timeLeft < seconds) {
                if (timeLeft > seconds - 61) {
                  setTimeLeft(seconds);
                  setMinutesLeft(10);
                  setSecondsLeft(0);
                } else {
                  setTimeLeft(timeLeft + 60);
                  setMinutesLeft(minutesLeft + 1);
                }
                sendData(timeLeft);
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
              sendData(timeLeft);
            }}
          ></i>
        </GridRow>
      </GridColumn>
      <GridColumn width={6} verticalAlign="middle">
        <Header size="large">
          <span>
            {minutesLeft < 10 && "0" + minutesLeft}
            {minutesLeft >= 10 && minutesLeft}
          </span>
          :
          <span>
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
              if (timeLeft < seconds) {
                setTimeLeft(timeLeft + 1);
                sendData(timeLeft);
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
                sendData(timeLeft);
                if (secondsLeft > 0) setSecondsLeft(secondsLeft - 1);
                if (secondsLeft === 0) {
                  setSecondsLeft(59);
                  setMinutesLeft(minutesLeft - 1);
                }
              }
            }}
          ></i>
        </GridRow>
      </GridColumn>
    </Grid>
  );
};

export default Timer;
