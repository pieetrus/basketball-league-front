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

const ChooseJerseysAndSquad: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  const { selectedMatch: match } = rootStore.matchStore;
  const {
    setTeamPlayers,
    setTeams,
    setTeamsJerseysColors,
    setTeamsChosenPlayers,
  } = rootStore.statsStore;

  const getSelectedPlayers = (guest: boolean) => {
    let selector;
    if (guest) selector = "td.guest div.checked input";
    else selector = "td.home div.checked input";

    let selectedCheckboxes: any = document.querySelectorAll(selector);
    let selectedPlayersIds: Number[] = [];

    for (let index = 0; index < selectedCheckboxes.length; index++) {
      let playerSeasonId = selectedCheckboxes[index].name!;
      selectedPlayersIds.push(playerSeasonId);
    }
    return selectedPlayersIds;
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
            <Segment>
              <SquadTable players={match!.teamHomePlayers} isGuest={false} />
            </Segment>
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
            <Segment>
              <SquadTable players={match!.teamGuestPlayers} isGuest={true} />
            </Segment>
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
            // closeModal();
            setTeamPlayers(match?.teamHomePlayers!, match?.teamGuestPlayers!);
            setTeams(match?.teamHome!, match?.teamGuest!);
            setTeamsJerseysColors(
              document
                .getElementById("team-color-home")!
                .getElementsByClassName("selected item")[0]
                .getElementsByTagName("span")[0]
                .innerHTML.toLowerCase(),
              document
                .getElementById("team-color-guest")!
                .getElementsByClassName("selected item")[0]
                .getElementsByTagName("span")[0]
                .innerHTML.toLowerCase()
            );
            console.log(getSelectedPlayers(true));
            setTeamsChosenPlayers(
              getSelectedPlayers(false),
              getSelectedPlayers(true)
            );
          }}
        />
      </Segment>
    </Fragment>
  );
};

export default observer(ChooseJerseysAndSquad);
