import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Grid, Header, Segment } from "semantic-ui-react";
import { reboundTypes } from "../../../app/common/options/reboundTypes";
import { shotTypes } from "../../../app/common/options/shotTypes";
import { IAssist } from "../../../app/models/assist";
import { IRebound } from "../../../app/models/rebound";
import { IShot } from "../../../app/models/shot";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ShotModal: React.FC<{ shotMade: boolean; isGuest: boolean }> = ({
  shotMade,
  isGuest,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    playerChosen,
    setPlayerChosen: setplayerChosen,
    createShot,
    submitting,
    getChosenTeamHomePlayers,
    getChosenTeamGuestPlayers,
    teamHomeJerseyColor,
    teamGuestJerseyColor,
    setPlayerChosen2,
    playerChosen2,
    quater,
  } = rootStore.statsStore;
  const { selectedMatch } = rootStore.matchStore;
  const { closeModal } = rootStore.modalStore;

  const getPlayers = (isRival: boolean) => {
    if (isGuest) {
      if (isRival) return getChosenTeamHomePlayers;
      return getChosenTeamGuestPlayers;
    } else {
      if (isRival) return getChosenTeamGuestPlayers;
      return getChosenTeamHomePlayers;
    }
  };

  const getJerseys = (isRival: boolean) => {
    if (isGuest) {
      if (isRival) return teamHomeJerseyColor;
      return teamGuestJerseyColor;
    } else {
      if (isRival) return teamGuestJerseyColor;
      return teamHomeJerseyColor;
    }
  };

  const [shotValue, setShotValue] = useState(0);
  const [assist, setAssist] = useState(false);
  const [shotType, setShotType] = useState({
    name: "",
    value: 0,
  });
  const [reboundType, setReboundType] = useState({
    name: "",
    value: 0,
  });

  const handleSubmit = () => {
    let model: IShot = {
      matchId: selectedMatch?.id!,
      playerId: playerChosen?.playerId!,
      seconds: document.getElementById("seconds-left")?.innerHTML!,
      minutes: document.getElementById("minutes-left")?.innerHTML!,
      quater: quater,
      flagged: false,
      shotType: shotType.value,
      isAccurate: shotMade,
      isFastAttack: false,
      value: shotValue,
      isGuest,
    };

    if (shotMade && assist) {
      let assist: IAssist = {
        playerId: playerChosen2?.playerId!,
      };
      model.assist = assist;
      model.playerAssistId = playerChosen2?.playerId;
    } else if (!shotMade) {
      let rebound: IRebound = {
        reboundType: reboundType.value,
      };
      model.reboundType = reboundType.value;
      model.rebound = rebound;

      if (reboundType.value === 1 || reboundType.value === 2) {
        // player rebounds
        rebound.playerId = playerChosen2?.playerId!;
        model.playerReboundId = playerChosen2?.playerId;
      } else if (reboundType.value === 3 || reboundType.value === 4) {
        // team rebounds
        // model.playerReboundId = playerChosen2?.playerId;
        // rebound.teamId = 2;
      }
    }

    createShot(model)
      .then(() => setplayerChosen(undefined, false))
      .then(() => setPlayerChosen2(undefined, false))
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
            {playerChosen2 && shotMade && (
              <Segment compact style={{ width: 40 }}>
                {"AST: " +
                  playerChosen2.jerseyNr +
                  ". " +
                  playerChosen2.name +
                  " " +
                  playerChosen2.surname}
              </Segment>
            )}
            {playerChosen2 && !shotMade && (
              <Segment compact style={{ width: 40 }}>
                {"REB: " +
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
              setPlayerChosen2(undefined, false);
            }}
          />
        </Grid.Row>
      )}
      <Grid.Row>
        {assist &&
          getPlayers(false)
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
                  color={getJerseys(false)}
                  inverted
                  content={player.jerseyNr}
                  clearing="true"
                  onClick={() => {
                    setPlayerChosen2(player, false);
                  }}
                  compact
                />
              </Grid.Column>
            ))}
      </Grid.Row>
      <Grid.Row>
        {!shotMade &&
          reboundTypes.map((reboundType) => (
            <Grid.Column width={3} key={reboundType.value}>
              <Button
                color="brown"
                size="huge"
                style={{ marginBottom: 30 }}
                disabled={shotType.value === 0}
                onClick={() => {
                  if (reboundType.value === 3 || reboundType.value === 4)
                    setPlayerChosen2(undefined, false);
                  setReboundType(reboundType);
                }}
              >
                {reboundType.name}
              </Button>
            </Grid.Column>
          ))}
      </Grid.Row>
      <Grid.Row>
        {reboundType.value === 1 &&
          getPlayers(false)!.map((player) => (
            <Grid.Column key={player.id} width={1} textAlign="center">
              <Button
                toggle
                style={{
                  width: 50,
                  height: 50,
                  fontSize: 17,
                  color: "black",
                }}
                color={getJerseys(false)}
                inverted
                content={player.jerseyNr}
                clearing="true"
                onClick={() => {
                  setPlayerChosen2(player, false);
                }}
                compact
              />
            </Grid.Column>
          ))}
      </Grid.Row>
      <Grid.Row>
        {reboundType.value === 2 &&
          getPlayers(true)!.map((player) => (
            <Grid.Column key={player.id} width={1} textAlign="center">
              <Button
                toggle
                style={{
                  width: 50,
                  height: 50,
                  fontSize: 17,
                  color: "black",
                }}
                color={getJerseys(true)}
                inverted
                content={player.jerseyNr}
                clearing="true"
                onClick={() => {
                  setPlayerChosen2(player, false);
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
