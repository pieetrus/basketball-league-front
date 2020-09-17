import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Grid, Header, Segment } from "semantic-ui-react";
import { shotTypes } from "../../../app/common/options/shotTypes";
import { IPlayerShortInfo } from "../../../app/models/matchDetailed";
import { IShot } from "../../../app/models/shot";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ShotModal: React.FC<{ shotMade: boolean; isGuest: boolean }> = ({
  shotMade,
  isGuest,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    playerChosen,
    setplayerChosen,
    createShot,
    submitting,
    getChosenTeamHomePlayers,
    getChosenTeamGuestPlayers,
    teamHomeJerseyColor,
    teamGuestJerseyColor,
    setplayerChosen2,
    playerChosen2,
    quater,
  } = rootStore.statsStore;
  const { selectedMatch } = rootStore.matchStore;
  const { closeModal } = rootStore.modalStore;

  let players: IPlayerShortInfo[] | undefined;
  let jerseyColor: any;

  if (isGuest) {
    players = getChosenTeamGuestPlayers;
    jerseyColor = teamGuestJerseyColor;
  } else {
    players = getChosenTeamHomePlayers;
    jerseyColor = teamHomeJerseyColor;
  }

  const [shotValue, setShotValue] = useState(0);
  const [assist, setAssist] = useState(false);
  const [shotType, setShotType] = useState({
    name: "",
    value: 0,
  });

  const handleSubmit = () => {
    let model: IShot = {
      matchId: selectedMatch?.id!,
      playerId: playerChosen?.id!,
      seconds: document.getElementById("seconds-left")?.innerHTML!,
      minutes: document.getElementById("minutes-left")?.innerHTML!,
      quater: quater,
      flagged: false,
      shotType: shotType.value,
      isAccurate: shotMade,
      isFastAttack: false,
      value: shotValue,
      playerAssistId: playerChosen2?.id!,
    };
    console.log(model);
    createShot(model)
      .then(() => setplayerChosen(undefined, false))
      .then(() => setplayerChosen2(undefined, false))
      .then(closeModal);
  };

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
            {shotType.value !== 0 && (
              <Segment
                compact
                onClick={() =>
                  setShotType({
                    name: "",
                    value: 0,
                  })
                }
                style={{ cursor: "pointer", width: 40 }}
              >
                {shotType.name}
              </Segment>
            )}
            {playerChosen && (
              <Segment compact style={{ width: 40 }}>
                {"PTS: " +
                  playerChosen.jerseyNr +
                  ". " +
                  playerChosen.name +
                  " " +
                  playerChosen.surname}
              </Segment>
            )}
            {playerChosen2 && (
              <Segment compact style={{ width: 40 }}>
                {"AST: " +
                  playerChosen2.jerseyNr +
                  ". " +
                  playerChosen2.name +
                  " " +
                  playerChosen2.surname}
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
          <Grid.Column width={3} key={shotType.value}>
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
              onClick={() => setShotType(shotType)}
            >
              {shotType.name}
            </Button>
          </Grid.Column>
        ))}
      </Grid.Row>
      {shotMade && (
        <Grid.Row>
          <Button
            content="Assist"
            size="massive"
            floated="left"
            style={{ marginRight: 50 }}
            onClick={() => setAssist(true)}
          />
          <Button
            content="No Assist"
            size="massive"
            floated="right"
            style={{ marginLeft: 50 }}
            onClick={() => {
              setAssist(false);
              setplayerChosen2(undefined, false);
            }}
          />
        </Grid.Row>
      )}
      <Grid.Row>
        {assist &&
          players
            ?.filter((player) => player.id !== playerChosen?.id)
            .map((player) => (
              <Grid.Column key={player.id} width={1} textAlign="center">
                <Button
                  toggle
                  style={{
                    width: 50,
                    height: 50,
                    fontSize: 17,
                    color: "black",
                  }}
                  color={jerseyColor}
                  inverted
                  content={player.jerseyNr}
                  clearing="true"
                  onClick={() => {
                    setplayerChosen2(player, false);
                  }}
                  compact
                />
              </Grid.Column>
            ))}
      </Grid.Row>
      <Grid.Row>
        <Button
          content="OK"
          positive
          size="massive"
          fluid
          loading={submitting}
          onClick={() => handleSubmit()}
        />
      </Grid.Row>
    </Grid>
  );
};

export default observer(ShotModal);
