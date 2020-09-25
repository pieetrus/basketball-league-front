import React from "react";
import { Grid, Segment, Header, Image } from "semantic-ui-react";
import { IMatchDetailed } from "../../app/models/matchDetailed";

const MatchTopBar: React.FC<{ match: IMatchDetailed }> = ({ match }) => {
  const segmentStyle = { display: "flex", alignItems: "center" };

  return (
    <Grid.Row>
      <Segment.Group style={{ width: 800 }}>
        <Segment.Group horizontal>
          <Segment style={segmentStyle} textAlign="center">
            <Image src={match?.teamHome.logoUrl} avatar size="mini" />
          </Segment>
          <Segment style={segmentStyle}>
            <Header content={match?.teamHome.name} textAlign="center" />
          </Segment>
          <Segment style={segmentStyle}>
            <Header content={match?.teamHomePts} textAlign="center" />
          </Segment>
          {match?.ended && <Segment style={segmentStyle}>Final</Segment>}
          {!match?.ended && !match?.started && (
            <Segment style={segmentStyle}>Soon</Segment>
          )}
          {match?.started && !match?.ended && (
            <Segment style={segmentStyle}>
              <Segment>
                {"Q" +
                  match?.lastIncidentQuater +
                  "   " +
                  match?.lastIncidentMinutes +
                  " : " +
                  match?.lastIncidentSeconds}
              </Segment>
            </Segment>
          )}
          <Segment style={segmentStyle}>
            <Header content={match?.teamGuestPts} textAlign="center" />
          </Segment>
          <Segment style={segmentStyle}>
            <Header content={match?.teamGuest.name} textAlign="center" />
          </Segment>
          <Segment style={segmentStyle} textAlign="center">
            <Image src={match?.teamGuest.logoUrl} avatar size="mini" />
          </Segment>
        </Segment.Group>
        <Segment textAlign="center">
          {"Date: " +
            match?.startDate.toString().split("T")[0] +
            " " +
            match?.startDate.toString().split("T")[1]}
        </Segment>
      </Segment.Group>
    </Grid.Row>
  );
};

export default MatchTopBar;
