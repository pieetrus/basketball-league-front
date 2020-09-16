import React, { useContext, useState } from "react";
import { Button, Grid, Header, Segment } from "semantic-ui-react";
import { shotTypes } from "../../../app/common/options/shotTypes";
import { RootStoreContext } from "../../../app/stores/rootStore";

const Shot: React.FC<{ shotMade: boolean }> = ({ shotMade }) => {
  const rootStore = useContext(RootStoreContext);
  const { playerChosen } = rootStore.statsStore;

  const [shotValue, setShotValue] = useState(0);
  const [shotType, setShotType] = useState("");
  return (
    <Grid centered>
      {shotMade && <Header content="Shot made" color="green" />}
      {!shotMade && <Header content="Shot missed" color="red" />}
      <Grid.Row centered>
        <Grid.Column width={3}>
          <Button positive size="huge" onClick={() => setShotValue(3)}>
            3 PTS
          </Button>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment.Group horizontal>
            {shotValue !== 0 && (
              <Segment
                compact
                onClick={() => setShotValue(0)}
                style={{ cursor: "pointer", width: 40 }}
              >
                {shotValue} PTS
              </Segment>
            )}
            {shotType !== "" && (
              <Segment
                compact
                onClick={() => setShotType("")}
                style={{ cursor: "pointer", width: 40 }}
              >
                {shotType}
              </Segment>
            )}
            {playerChosen && (
              <Segment
                compact
                onClick={() => setShotType("")}
                style={{ cursor: "pointer", width: 40 }}
              >
                {playerChosen.jerseyNr +
                  ". " +
                  playerChosen.name +
                  " " +
                  playerChosen.surname}
              </Segment>
            )}
          </Segment.Group>
        </Grid.Column>
        <Grid.Column width={3}>
          <Button positive size="huge" onClick={() => setShotValue(2)}>
            2 PTS
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {shotTypes.map((shotType) => (
          <Grid.Column width={3}>
            <Button
              color="brown"
              size="huge"
              style={{ marginBottom: 30 }}
              disabled={
                shotValue === 0 ||
                (shotValue === 3 &&
                  (shotType.value === 6 ||
                    shotType.value === 7 ||
                    shotType.value === 8 ||
                    shotType.value === 9))
              }
              onClick={() => setShotType(shotType.name)}
            >
              {shotType.name}
            </Button>
          </Grid.Column>
        ))}
      </Grid.Row>
      <Grid.Row>
        <Button content="OK" positive size="massive" fluid />
      </Grid.Row>
    </Grid>
  );
};

export default Shot;
