import { observer } from "mobx-react-lite";
import React from "react";
import { Segment, Image } from "semantic-ui-react";
import { ITeam } from "../../app/models/team";

const TeamScore: React.FC<{ isHomeTeam: boolean; team: ITeam }> = ({
  team,
  isHomeTeam,
}) => {
  if (isHomeTeam)
    return (
      <Segment.Group horizontal>
        <Segment size="mini">
          <Image
            avatar
            floated="left"
            src={"../assets/logo-dalk.png"}
            style={{ marginLeft: 10 }}
          />
        </Segment>
        <Segment size="huge" textAlign="center">
          team name
          {/* {team.name} */}
        </Segment>
        <Segment textAlign="center" vertical>
          <h3>90</h3>
        </Segment>
      </Segment.Group>
    );
  else {
    return (
      <Segment.Group horizontal>
        <Segment textAlign="center" vertical>
          <h3>90</h3>
        </Segment>
        <Segment size="huge" textAlign="center">
          team name
          {/* {team.name} */}
        </Segment>
        <Segment size="mini">
          <Image avatar src={"../assets/logo-dalk.png"} />
        </Segment>
      </Segment.Group>
    );
  }
};

export default observer(TeamScore);
