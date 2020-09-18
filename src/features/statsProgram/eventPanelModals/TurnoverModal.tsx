import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Grid, Header, Segment } from "semantic-ui-react";
import { turnoverTypes } from "../../../app/common/options/turnoverTypes";
import { IPlayerShortInfo } from "../../../app/models/matchDetailed";
import { ISteal } from "../../../app/models/steal";
import { ITurnover } from "../../../app/models/turnover";
import { RootStoreContext } from "../../../app/stores/rootStore";

const TurnoverModal: React.FC<{ isGuest: boolean }> = ({ isGuest }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    playerChosen,
    setPlayerChosen,
    createTurnover,
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

  let players: IPlayerShortInfo[] | undefined;
  let jerseyColor: any;

  if (isGuest) {
    //rivals
    players = getChosenTeamHomePlayers;
    jerseyColor = teamHomeJerseyColor;
  } else {
    players = getChosenTeamGuestPlayers;
    jerseyColor = teamGuestJerseyColor;
  }

  const [steal, setSteal] = useState(false);
  const [turnoverType, setTurnoverType] = useState({
    name: "",
    value: 0,
  });

  const handleSubmit = () => {
    let model: ITurnover = {
      matchId: selectedMatch?.id!,
      playerId: playerChosen?.playerId!,
      seconds: document.getElementById("seconds-left")?.innerHTML!,
      minutes: document.getElementById("minutes-left")?.innerHTML!,
      quater: quater,
      flagged: false,
      isGuest,
      turnoverType: turnoverType.value,
      playerStealId: playerChosen2?.playerId,
    };
    if (steal) {
      let stealModel: ISteal = {
        playerId: playerChosen2?.playerId!,
      };
      model.steal = stealModel;
    }

    createTurnover(model)
      .then(() => setPlayerChosen(undefined, false))
      .then(() => setPlayerChosen2(undefined, false))
      .then(closeModal);
  };

  return (
    <Grid centered>
      {<Header content="Turnover" color="blue" />}
      <Grid.Row centered>
        <Grid.Column width={6}>
          <Segment.Group horizontal>
            {turnoverType.value !== 0 && (
              <Segment
                compact
                onClick={() =>
                  setTurnoverType({
                    name: "",
                    value: 0,
                  })
                }
                style={{ cursor: "pointer", width: 40 }}
              >
                {turnoverType.name}
              </Segment>
            )}
            {playerChosen && (
              <Segment compact style={{ width: 40 }}>
                {"TO: " +
                  playerChosen.jerseyNr +
                  ". " +
                  playerChosen.name +
                  " " +
                  playerChosen.surname}
              </Segment>
            )}
            {playerChosen2 && (
              <Segment compact style={{ width: 40 }}>
                {"STEAL: " +
                  playerChosen2.jerseyNr +
                  ". " +
                  playerChosen2.name +
                  " " +
                  playerChosen2.surname}
              </Segment>
            )}
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {turnoverTypes.map((turnoverType) => (
          <Grid.Column width={3} key={turnoverType.value}>
            <Button
              color="brown"
              size="huge"
              style={{ marginBottom: 30 }}
              onClick={() => setTurnoverType(turnoverType)}
            >
              {turnoverType.name}
            </Button>
          </Grid.Column>
        ))}
      </Grid.Row>
      <Grid.Row>
        <Button
          content="Steal"
          size="massive"
          floated="left"
          style={{ marginRight: 50 }}
          onClick={() => setSteal(true)}
        />
        <Button
          content="No Steal"
          size="massive"
          floated="right"
          style={{ marginLeft: 50 }}
          onClick={() => {
            setSteal(false);
            setPlayerChosen2(undefined, false);
          }}
        />
      </Grid.Row>
      <Grid.Row>
        {steal &&
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

export default observer(TurnoverModal);
