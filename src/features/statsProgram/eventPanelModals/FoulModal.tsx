import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Grid, Header, Segment } from "semantic-ui-react";
import { foulTypes } from "../../../app/common/options/foulTypes";
import { IAssist } from "../../../app/models/assist";
import { IFoul } from "../../../app/models/foul";
import { IFreeThrow } from "../../../app/models/freethrow";
import { IPlayerShortInfo } from "../../../app/models/matchDetailed";
import { RootStoreContext } from "../../../app/stores/rootStore";

const FoulModal: React.FC<{ isGuest: boolean }> = ({ isGuest }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    playerChosen,
    playerChosen2,
    playerChosen3,
    getChosenTeamGuestPlayers,
    getChosenTeamHomePlayers,
    teamHomeJerseyColor,
    teamGuestJerseyColor,
    setPlayerChosen,
    setPlayerChosen2,
    setPlayerChosen3,
    quater,
    createFoul,
  } = rootStore.statsStore;

  const { selectedMatch } = rootStore.matchStore;
  const { closeModal } = rootStore.modalStore;

  const [foulType, setFoulType] = useState({
    name: "",
    value: 0,
  });

  const [freeThrows, setFreeThrows] = useState(false);
  const [assist, setAssist] = useState(false);
  const [rebound, setRebound] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [made, setMade] = useState(0);

  let players: IPlayerShortInfo[] | undefined;
  let jerseyColor: any;

  const handleSubmit = () => {
    let model: IFoul = {
      matchId: selectedMatch?.id!,
      seconds: document.getElementById("seconds-left")?.innerHTML!,
      minutes: document.getElementById("minutes-left")?.innerHTML!,
      quater: quater,
      flagged: false,
      isGuest,
      foulType: foulType.value,
      playerWhoFouledId: playerChosen?.playerId,
      playerWhoWasFouledId: playerChosen2?.playerId,
    };

    if (freeThrows) {
      let freeThrowModel: IFreeThrow = {
        accurateShots: made,
        attempts: attempts,
        playerShooterId: playerChosen2?.playerId,
      };
      model.freeThrows = freeThrowModel;
      model.accurateShots = freeThrowModel.accurateShots;
      model.attempts = freeThrowModel.attempts;
      model.playerShooterId = freeThrowModel.playerShooterId;
      if (assist) {
        let assistModel: IAssist = {
          playerId: playerChosen3?.playerId!,
        };
        freeThrowModel.assist = assistModel;
        model.playerAssistId = assistModel.playerId;
      }

      // if (rebound) {
      //   let reboundModel: IRebound = {
      //   };
      // }
    }
    createFoul(model)
      .then(() => setPlayerChosen(undefined, false))
      .then(() => setPlayerChosen2(undefined, false))
      .then(closeModal);
  };

  if (isGuest) {
    // rival players
    players = getChosenTeamHomePlayers;
    jerseyColor = teamHomeJerseyColor;
  } else {
    players = getChosenTeamGuestPlayers;
    jerseyColor = teamGuestJerseyColor;
  }

  return (
    <Grid centered>
      <Header content="Foul" color="purple" />
      <Grid.Row>
        <Segment.Group horizontal>
          <Segment>{"Type: " + foulType.name}</Segment>
          <Segment>
            {"Foul by: " +
              playerChosen?.jerseyNr +
              "." +
              playerChosen?.name +
              " " +
              playerChosen?.surname}
          </Segment>
          {playerChosen2 && (
            <Segment>
              {"Foul on: " +
                playerChosen2?.jerseyNr +
                "." +
                playerChosen2?.name +
                " " +
                playerChosen2?.surname}
            </Segment>
          )}
          {playerChosen3 && assist && (
            <Segment>
              {"Assist : " +
                playerChosen3?.jerseyNr +
                "." +
                playerChosen3?.name +
                " " +
                playerChosen3?.surname}
            </Segment>
          )}
          {playerChosen3 && rebound && (
            <Segment>
              {"Rebound : " +
                playerChosen3?.jerseyNr +
                "." +
                playerChosen3?.name +
                " " +
                playerChosen3?.surname}
            </Segment>
          )}
          {attempts !== 0 && <Segment>{"Attemps: " + attempts}</Segment>}
          {attempts !== 0 && <Segment>{"Made: " + made}</Segment>}
        </Segment.Group>
      </Grid.Row>
      <Grid.Row>
        {foulTypes.slice(0, 9).map((foulType) => (
          <Grid.Column width={3} key={foulType.value}>
            <Button
              color="brown"
              size="huge"
              style={{ marginBottom: 30 }}
              onClick={() => {
                setFoulType(foulType);
                if (foulType.value === 4) setPlayerChosen2(undefined, false);
              }}
            >
              {foulType.name}
            </Button>
          </Grid.Column>
        ))}
      </Grid.Row>
      {foulType.value !== 4 && // if not technical foul
        foulType.value !== 0 && (
          <Grid.Row>
            <Header content="Foul on" color="teal" />
            {players
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
        )}
      <Grid.Row>
        <Grid.Column width={4} textAlign="center">
          <Button
            color="instagram"
            inverted
            content="Insert free throws"
            clearing="true"
            onClick={() => setFreeThrows(true)}
            compact
          />
        </Grid.Column>
        <Grid.Column width={4} textAlign="center">
          <Button
            color="red"
            inverted
            content="No free throws"
            clearing="true"
            onClick={() => {
              setFreeThrows(false);
              setMade(0);
              setAttempts(0);
              setAssist(false);
              setPlayerChosen3(undefined, false);
            }}
            compact
          />
        </Grid.Column>
        <Grid.Column width={4} textAlign="center">
          <Button
            color="instagram"
            inverted
            content="Insert assist"
            clearing="true"
            onClick={() => setAssist(true)}
            compact
          />
        </Grid.Column>
        <Grid.Column width={4} textAlign="center">
          <Button
            color="red"
            inverted
            content="No assist"
            clearing="true"
            onClick={() => {
              setAssist(false);
              setPlayerChosen3(undefined, false);
            }}
            compact
          />
        </Grid.Column>
      </Grid.Row>
      {freeThrows && (
        <Grid.Row>
          <Header content="How many attemps?" color="teal" />
          <Grid.Column width={2} textAlign="center">
            <Button
              toggle
              color="linkedin"
              inverted
              content="1"
              clearing="true"
              onClick={() => {
                setAttempts(1);
                setMade(0);
              }}
            />
          </Grid.Column>
          <Grid.Column width={2} textAlign="center">
            <Button
              toggle
              color="linkedin"
              inverted
              content="2"
              clearing="true"
              onClick={() => {
                setAttempts(2);
                setMade(0);
              }}
            />
          </Grid.Column>
          <Grid.Column width={2} textAlign="center">
            <Button
              toggle
              color="linkedin"
              inverted
              content="3"
              clearing="true"
              onClick={() => {
                setAttempts(3);
                setMade(0);
              }}
            />
          </Grid.Column>
        </Grid.Row>
      )}
      {attempts !== 0 && (
        <Grid.Row>
          <Header content="How many made?" color="teal" />
          <Grid.Column width={2} textAlign="center">
            <Button
              toggle
              color="linkedin"
              inverted
              content="0"
              clearing="true"
              onClick={() => {
                setMade(0);
              }}
            />
          </Grid.Column>
          <Grid.Column width={2} textAlign="center">
            <Button
              toggle
              color="linkedin"
              inverted
              content="1"
              clearing="true"
              onClick={() => {
                setMade(1);
              }}
            />
          </Grid.Column>
          {attempts > 1 && (
            <Grid.Column width={2} textAlign="center">
              <Button
                toggle
                color="linkedin"
                inverted
                content="2"
                clearing="true"
                onClick={() => {
                  setMade(2);
                }}
              />
            </Grid.Column>
          )}
          {attempts > 2 && (
            <Grid.Column width={2} textAlign="center">
              <Button
                toggle
                color="linkedin"
                inverted
                content="3"
                clearing="true"
                onClick={() => {
                  setMade(3);
                }}
              />
            </Grid.Column>
          )}
        </Grid.Row>
      )}
      {assist && freeThrows && <Header content="Assist" color="teal" />}
      {assist &&
        freeThrows &&
        players
          ?.filter((player) => player.id !== playerChosen2?.id)
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
                  setPlayerChosen3(player, false);
                }}
                compact
              />
            </Grid.Column>
          ))}
      {freeThrows && attempts > made && (
        <Header content="Rebound" color="teal" />
      )}
      {freeThrows &&
        attempts > made &&
        players
          ?.filter((player) => player.id !== playerChosen2?.id)
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
                  setPlayerChosen3(player, false);
                }}
                compact
              />
            </Grid.Column>
          ))}
      <Grid.Row>
        <Button
          content="OK"
          positive
          size="massive"
          fluid
          disabled={
            foulType.value === 0 ||
            (foulType.value !== 4 && playerChosen2 === undefined)
          }
          //   loading={submitting}
          onClick={() => handleSubmit()}
        />
      </Grid.Row>
    </Grid>
  );
};

export default observer(FoulModal);
