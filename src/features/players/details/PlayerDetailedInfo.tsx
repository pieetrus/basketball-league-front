import React from "react";
import { Segment, Grid, Icon, Button } from "semantic-ui-react";
import { IPlayer } from "../../../app/models/player";
import { format } from "date-fns";
import { IUser } from "../../../app/models/user";
import { AdminRole } from "../../../app/common/global";
import { Link } from "react-router-dom";
const PlayerDetailedInfo: React.FC<{ player: IPlayer; user: IUser }> = ({
  player,
  user,
}) => {
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
      {user?.role === AdminRole && (
        <Segment textAlign="center">
          <Button
            as={Link}
            to={`/manager/player/${player.id}`}
            color="orange"
            content="Manage player"
          />
        </Segment>
      )}
    </Segment.Group>
  );
};

export default PlayerDetailedInfo;
