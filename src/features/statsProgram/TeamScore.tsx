import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Segment, Image } from "semantic-ui-react";
import { ITeam } from "../../app/models/team";
import { RootStoreContext } from "../../app/stores/rootStore";

const TeamScore: React.FC<{ isHomeTeam: boolean; team: ITeam }> = ({
  team,
  isHomeTeam,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { teamHomePts, teamGuestPts } = rootStore.statsProgramStore;

  if (isHomeTeam)
    return (
      <Segment.Group horizontal>
        <Segment size="mini">
          <Image
            avatar
            floated="left"
            src={team && team.logoUrl}
            style={{ marginLeft: 10 }}
          />
        </Segment>
        <Segment size="huge" textAlign="center">
          {team && team.name}
          {!team && "Team name"}
        </Segment>
        <Segment textAlign="center" vertical>
          <h3>{teamHomePts}</h3>
        </Segment>
      </Segment.Group>
    );
  else {
    return (
      <Segment.Group horizontal>
        <Segment textAlign="center" vertical>
          <h3>{teamGuestPts}</h3>
        </Segment>
        <Segment size="huge" textAlign="center">
          {team && team.name}
          {!team && "Team name"}
        </Segment>
        <Segment size="mini">
          <Image avatar src={team && team.logoUrl} />
        </Segment>
      </Segment.Group>
    );
  }
};

export default observer(TeamScore);
