import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { IPlayer } from "../../../app/models/player";
import { format } from "date-fns";
const PlayerDetailedInfo: React.FC<{ player: IPlayer }> = ({ player }) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="arrow up" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{player.height + " cm"}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="birthday" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(player.birthdate!, "d.MM.yyyy")}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="basketball ball" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{player.position}</span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default PlayerDetailedInfo;
