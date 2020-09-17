import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Grid, Header, Segment } from "semantic-ui-react";
import { foulTypes } from "../../../app/common/options/foulTypes";
import { IFoul } from "../../../app/models/foul";
import { IPlayerShortInfo } from "../../../app/models/matchDetailed";
import { RootStoreContext } from "../../../app/stores/rootStore";

const FoulModal: React.FC<{ isGuest: boolean }> = ({ isGuest }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    playerChosen,
    playerChosen2,
    getChosenTeamGuestPlayers,
    getChosenTeamHomePlayers,
    teamHomeJerseyColor,
    teamGuestJerseyColor,
    setPlayerChosen2,
    setPlayerChosen,
    quater,
    createFoul,
  } = rootStore.statsStore;

  const { selectedMatch } = rootStore.matchStore;
  const { closeModal } = rootStore.modalStore;

  const [foulType, setFoulType] = useState({
    name: "",
    value: 0,
  });

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
      playerWhoFouledId: playerChosen?.id,
      playerWhoWasFouledId: playerChosen2?.id,
    };
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
