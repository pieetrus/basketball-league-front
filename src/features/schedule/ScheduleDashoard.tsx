import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Button, Grid, Header, Image, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";

const ScheduleDashoard = () => {
  const rootStore = useContext(RootStoreContext);
  //   const { loadTeams } = rootStore.teamStore;
  //   const { loadDivisions } = rootStore.divisionStore;
  const {
    loadMatches,
    loadMatchesDetailed,
    matchesDetailedByDate,
  } = rootStore.matchStore;

  useEffect(() => {
    loadMatches();
    loadMatchesDetailed();
  }, [loadMatches, loadMatchesDetailed]);

  const segmentStyle = { display: "flex", alignItems: "center" };

  return (
    <Grid centered>
      {matchesDetailedByDate.map((match) => (
        <Grid.Row key={match.id}>
          <Segment.Group style={{ width: 800 }}>
            <Segment textAlign="center">
              <Segment.Inline>{match.division}</Segment.Inline>
              {"Date: " +
                match.startDate.toString().split("T")[0] +
                " " +
                match.startDate.toString().split("T")[1]}
            </Segment>
            <Segment.Group horizontal>
              <Segment style={segmentStyle} textAlign="center">
                <Image src={match.teamHome.logoUrl} avatar size="mini" />
              </Segment>
              <Segment style={segmentStyle}>
                <Header content={match.teamHome.name} textAlign="center" />
              </Segment>
              <Segment style={segmentStyle}>
                <Header content={match.teamHomePts} textAlign="center" />
              </Segment>
              <Segment style={segmentStyle}>Final</Segment>
              <Segment style={segmentStyle}>
                <Header content={match.teamGuestPts} textAlign="center" />
              </Segment>
              <Segment style={segmentStyle}>
                <Header content={match.teamGuest.name} textAlign="center" />
              </Segment>
              <Segment style={segmentStyle} textAlign="center">
                <Image src={match.teamGuest.logoUrl} avatar size="mini" />
              </Segment>
            </Segment.Group>
            <Segment textAlign="center">
              <Button content="Box score" />
            </Segment>
          </Segment.Group>
        </Grid.Row>
      ))}
    </Grid>
  );
};

export default observer(ScheduleDashoard);
