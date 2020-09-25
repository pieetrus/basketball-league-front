import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Grid, Header, Image, Segment } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import { history } from "../..";
interface DetailParams {
  id: string;
}
const MatchDashboard: React.FC<RouteComponentProps<DetailParams>> = ({
  match: match2,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    setSelectedMatch,
    selectedMatch: match,
    loading,
  } = rootStore.matchStore;

  useEffect(() => {
    let id = Number(match2.params.id);
    if (isNaN(id)) {
      id = -1;
    }
    setSelectedMatch(id);
  }, [setSelectedMatch, match2.params.id]);

  if (loading) return <LoadingComponent content="Loading match details" />;
  const segmentStyle = { display: "flex", alignItems: "center" };
  return (
    <Grid centered>
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
    </Grid>
  );
};

export default observer(MatchDashboard);
