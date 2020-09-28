import React, { Fragment, useContext } from "react";
import {
  Segment,
  Grid,
  Divider,
  Image,
  Header,
  Select,
  Button,
} from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { jerseyColorOptions } from "../../app/common/options/jerseyColorOptions";
import SquadTable from "./SquadTable";
import { history } from "../..";
import { toast } from "react-toastify";

const ChooseJerseysAndSquad: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  const { selectedMatch: match } = rootStore.matchStore;
  const {
    setTeams,
    setTeamsJerseysColors,
    setTeamsChosenPlayers,
    setMatch,
    startMatch,
    setPlayersInGameFromMatchModel,
    setEditableActionLog,
  } = rootStore.statsProgramStore;

  const selectedTeamHomePlayersSelector = "td.home div.checked input";
  const selectedTeamGuestPlayersSelector = "td.guest div.checked input";

  const getSelectedPlayers = (guest: boolean) => {
    let selector;
    if (guest) selector = selectedTeamGuestPlayersSelector;
    else selector = selectedTeamHomePlayersSelector;

    let selectedCheckboxes: any = document.querySelectorAll(selector);
    let selectedPlayersIds: Number[] = [];

    for (let index = 0; index < selectedCheckboxes.length; index++) {
      let playerSeasonId = Number.parseInt(selectedCheckboxes[index].name!);
      selectedPlayersIds.push(playerSeasonId);
    }
    return selectedPlayersIds;
  };

  const getSelectedJerseyColor = (guest: boolean) => {
    let idSelector;
    if (guest) idSelector = "team-color-guest";
    else idSelector = "team-color-home";
    let selectedItem = document
      .getElementById(idSelector)!
      .getElementsByClassName("active selected item")[0];

    if (selectedItem)
      return selectedItem
        .getElementsByTagName("span")[0]
        .innerHTML.toLowerCase();
    else return selectedItem;
  };

  const validate = () => {
    if (
      document.querySelectorAll(selectedTeamHomePlayersSelector).length < 4 ||
      document.querySelectorAll(selectedTeamHomePlayersSelector).length > 12
    ) {
      toast.error("Bad amount of team home players (5-12)");
      return false;
    }
    if (
      document.querySelectorAll(selectedTeamGuestPlayersSelector).length < 4 ||
      document.querySelectorAll(selectedTeamHomePlayersSelector).length > 12
    ) {
      toast.error("Bad amount of team guest players (5-12)");
      return false;
    }
    if (!getSelectedJerseyColor(false)) {
      toast.error("Select team home jersey color");
      return false;
    }
    if (!getSelectedJerseyColor(true)) {
      toast.error("Select team guest jersey color");
      return false;
    }

    if (getSelectedJerseyColor(true) === getSelectedJerseyColor(false)) {
      toast.error("Teams cannot have the same jersey colors");
      return false;
    }
    return true;
  };

  return (
    <Fragment>
      <Segment>
        <Grid>
          <Grid.Column width={8}>
            <Header textAlign="center">
              {match?.teamHome.name}
              <Image
                src={match?.teamHome.logoUrl}
                avatar={true}
                style={{ marginLeft: 20 }}
              />
            </Header>
            {!match?.started && (
              <Segment.Group>
                <Segment>
                  Choose team color
                  <Select
                    options={jerseyColorOptions}
                    style={{ marginLeft: 10 }}
                    placeholder="Choose jersey color"
                    id="team-color-home"
                  />
                </Segment>
              </Segment.Group>
            )}
            {!match?.started && (
              <Segment>
                <SquadTable players={match!.teamHomePlayers} isGuest={false} />
              </Segment>
            )}
          </Grid.Column>
          <Grid.Column width={8}>
            <Header textAlign="center">
              {match?.teamGuest.name}
              <Image
                src={match?.teamGuest.logoUrl}
                avatar={true}
                style={{ marginLeft: 20 }}
              />
            </Header>
            {!match?.started && (
              <Segment.Group>
                <Segment>
                  Choose team color
                  <Select
                    options={jerseyColorOptions}
                    style={{ marginLeft: 10 }}
                    placeholder="Choose jersey color"
                    id="team-color-guest"
                  />
                </Segment>
              </Segment.Group>
            )}
            {!match?.started && (
              <Segment>
                <SquadTable players={match!.teamGuestPlayers} isGuest={true} />
              </Segment>
            )}
          </Grid.Column>
        </Grid>
        <Divider vertical />
      </Segment>
      <Segment textAlign="right">
        <Button
          content="Next"
          positive
          size="big"
          onClick={() => {
            if (match?.started) {
              setMatch(match!);
              setTeams(match?.teamHome!, match?.teamGuest!);
              setTeamsJerseysColors(
                match.teamHomeJerseyColor,
                match.teamGuestJerseyColor
              );
              setPlayersInGameFromMatchModel();
            }
            if (!match?.started && validate()) {
              setMatch(match!);
              setTeams(match?.teamHome!, match?.teamGuest!);
              setTeamsJerseysColors(
                getSelectedJerseyColor(false),
                getSelectedJerseyColor(true)
              );
              setTeamsChosenPlayers(
                getSelectedPlayers(false),
                getSelectedPlayers(true)
              );
              startMatch();
            }
            setEditableActionLog(true);
            closeModal();
            history.push("/statsProgram");
          }}
        />
      </Segment>
    </Fragment>
  );
};

export default observer(ChooseJerseysAndSquad);
