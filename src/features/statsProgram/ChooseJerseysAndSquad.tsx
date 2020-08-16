import React, { Fragment, useContext } from "react";
import {
  Segment,
  Grid,
  Divider,
  Image,
  Header,
  Select,
} from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { jerseyColorOptions } from "../../app/common/options/jerseyColorOptions";
import SquadTable from "./SquadTable";

const ChooseJerseysAndSquad: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { selectedMatch: match } = rootStore.matchStore;

  return (
    <Fragment>
      <Segment>
        <Grid>
          <Grid.Column width={8}>
            <Header textAlign="center">
              {match?.teamHome.name}{" "}
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
                />
              </Segment>
            </Segment.Group>
            <Segment>
              <SquadTable players={match!.teamHomePlayers} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Header textAlign="center">
              {match?.teamGuest.name}{" "}
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
                />
              </Segment>
            </Segment.Group>
            <Segment>
              <SquadTable players={match!.teamGuestPlayers} />
            </Segment>
          </Grid.Column>
        </Grid>
        <Divider vertical />
      </Segment>
    </Fragment>
  );
};

export default observer(ChooseJerseysAndSquad);
